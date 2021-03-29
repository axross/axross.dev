import hash from "hasha";
import * as directiveExtension from "mdast-util-directive";
import extractString from "mdast-util-to-string";
import directiveSyntax from "micromark-extension-directive";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import unified, { CompilerFunction, Processor, Transformer } from "unified";
import type { Node, Parent } from "unist";
import visit from "unist-util-visit";
import { NodeExternalResourceService } from "./external-resource";

export async function parseMarkdown(markdown: string): Promise<Node> {
  const processor = unified()
    .data("micromarkExtensions", [directiveSyntax()])
    .data("fromMarkdownExtensions", [directiveExtension.fromMarkdown])
    .use(remarkParse)
    .use(convertHeading)
    .use(convertImageFigure)
    .use(convertEmbed)
    .use(resolveEmbedType)
    .use(resolveExternalResource);

  return await processor.run(processor.parse(markdown));
}

export function generateMarkdown(node: Node): string {
  const processor = unified()
    .data("toMarkdownExtensions", [directiveExtension.toMarkdown])
    .use(remarkStringify);

  return processor.stringify(node);
}

export function generateTableOfContents(
  node: Node
): { id: string; level: number; text: string }[] {
  const processor = unified().use(remarkTocify);

  return processor.stringify(node) as any;
}

function convertHeading() {
  const transformer: Transformer = (tree) => {
    visit(tree, "heading", (node, index, parent) => {
      const id = hash(extractString(node)).substring(0, 8);

      parent!.children.splice(index, 1, {
        type: "leafDirective",
        name: `rich-heading-${node.depth}`,
        attributes: {
          id,
        },
        children: node.children,
        position: node.position,
      });
    });
  };

  return transformer;
}

function convertImageFigure() {
  const transformer: Transformer = (tree) => {
    visit(tree, "paragraph", (node: Parent, index, parent) => {
      if (node.children.length !== 1) {
        return;
      }

      if (node.children[0]!.type !== "image") {
        return;
      }

      parent!.children.splice(index, 1, {
        type: "leafDirective",
        name: "image-figure",
        attributes: {
          src: node.children[0]!.url,
          caption: node.children[0]!.alt,
        },
      });
    });
  };

  return transformer;
}

function convertEmbed() {
  const transformer: Transformer = (tree) => {
    visit(tree, "paragraph", (node: Parent, index, parent) => {
      if (node.children.length !== 1) {
        return;
      }

      if (node.children[0]!.type !== "link") {
        return;
      }

      parent!.children.splice(index, 1, {
        type: "leafDirective",
        name: "embed",
        attributes: {
          href: node.children[0]!.url,
          title: extractString(node.children[0]!),
        },
      });
    });
  };

  return transformer;
}

function resolveEmbedType() {
  const transformer: Transformer = (tree) => {
    visit(tree, { type: "leafDirective", name: "embed" }, (node) => {
      node.name = "webpage-embed";
    });
  };

  return transformer;
}

function resolveExternalResource() {
  const transformer: Transformer = async (tree) => {
    const targetNodes: Node[] = [];

    visit(
      tree,
      [
        { type: "leafDirective", name: "image-figure" },
        { type: "leafDirective", name: "webpage-embed" },
      ],
      (node) => {
        targetNodes.push(node);
      }
    );

    const externalResourceService = new NodeExternalResourceService();

    await Promise.all(
      targetNodes.map(async (node) => {
        const attributes = node.attributes as any;

        switch (node.name) {
          case "image-figure":
            if (
              (attributes as any).width !== undefined &&
              (attributes as any).height !== undefined
            ) {
              return;
            }

            try {
              const dimension = await externalResourceService.resolveImageDimension(
                attributes.src
              );

              if (dimension) {
                const [width, height] = dimension;

                (attributes as any).width = `${width}`;
                (attributes as any).height = `${height}`;
              }
            } catch (error) {}

            break;
          case "webpage-embed":
            const url = attributes.href as string;

            try {
              const webpage = await externalResourceService.scrapeWebpage(url, {
                titleFallback: attributes.title,
              });

              attributes.href = webpage.href;
              attributes.title = webpage.title;
              attributes.description = webpage.description;
              attributes.imageSrc = webpage.imageSrc;
            } catch (error) {
              attributes.href = url;
              attributes.title = attributes.title || "Unknown website";
              attributes.description =
                "Failed to resolve the web page information.";
              attributes.imageSrc = "/favicon.png";
            }

            break;
        }
      })
    );
  };

  return transformer;
}

function remarkTocify(this: Processor) {
  const compile: CompilerFunction = (tree) => {
    const tableOfContents: { id: string; level: number; text: string }[] = [];

    visit(
      tree,
      [
        { type: "leafDirective", name: "rich-heading-1" },
        { type: "leafDirective", name: "rich-heading-2" },
        { type: "leafDirective", name: "rich-heading-3" },
        { type: "leafDirective", name: "rich-heading-4" },
        { type: "leafDirective", name: "rich-heading-5" },
        { type: "leafDirective", name: "rich-heading-6" },
      ],
      (node) => {
        tableOfContents.push({
          id: (node.attributes as any).id,
          level: parseInt((node.name as any).replace("rich-heading-", "")),
          text: extractString(node),
        });
      }
    );

    return tableOfContents as any;
  };

  this.Compiler = compile;
}
