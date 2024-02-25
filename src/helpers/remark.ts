/* eslint-disable import/namespace, import/no-deprecated, import/no-unresolved */
import { type Element as HastElement, type Root as HastRoot } from "hast";
import { type Heading as MdastHeading, type Root as MdastRoot } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import { type Processor } from "unified";
import { visit } from "unist-util-visit";
/* eslint-enable import/namespace, import/no-deprecated, import/no-unresolved */
import { hash } from "~/helpers/hash";

export interface OutlineNode {
  id: string;
  depth: number;
  label: string;
}

async function getHeadingId({
  depth,
  textContent,
}: {
  depth: number;
  textContent: string;
}): Promise<string> {
  const hashed = await hash(`${textContent}@${depth}`);

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return hashed.slice(-16);
}

/**
 * a remark plugin that automatically assign hashed id to each heading.
 */
function remarkHeadingId(): (tree: MdastRoot) => Promise<void> {
  return async (tree) => {
    const headingNodes: MdastHeading[] = [];

    visit(tree, "heading", (node) => {
      headingNodes.push(node);
    });

    const promises: Promise<unknown>[] = [];

    for (const node of headingNodes) {
      const textContent = mdastToString(node);
      const { depth } = node;

      promises.push(
        getHeadingId({ textContent, depth }).then((id) => {
          node.data ??= {};
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, unicorn/consistent-destructuring
          (node.data as any).hProperties ??= {};
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, unicorn/consistent-destructuring
          (node.data as any).hProperties.id = id;
        }),
      );
    }

    await Promise.all(promises);
  };
}

/**
 * a rehype plugin that generates the list of heading nodes.
 */
function rehypeOutline(this: Processor): void {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function compile(tree: HastRoot): Promise<OutlineNode[]> {
    const headingNodes: HastElement[] = [];

    visit<HastRoot, { type: "element" }>(
      tree,
      [
        { type: "element", tagName: "h1" },
        { type: "element", tagName: "h2" },
        { type: "element", tagName: "h3" },
        { type: "element", tagName: "h4" },
        { type: "element", tagName: "h5" },
        { type: "element", tagName: "h6" },
      ] as never,
      (node) => {
        headingNodes.push(node);
      },
    );

    const outline: OutlineNode[] = [];
    const promises: Promise<unknown>[] = [];

    for (const node of headingNodes) {
      const textContent = mdastToString(node);
      const depth = Number.parseInt(node.tagName.slice(1));

      promises.push(
        getHeadingId({ textContent, depth }).then((id) => {
          outline.push({ id, depth, label: textContent });
        }),
      );
    }

    await Promise.all(promises);

    return outline;
  }

  this.compiler = compile as never;
}

export { remarkHeadingId, rehypeOutline };
