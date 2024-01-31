import { hashSync } from "hasha";
/* eslint-disable import/namespace, import/no-deprecated, import/no-unresolved */
import { type Root as HastRoot } from "hast";
import { type Root as MdastRoot } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import { type Processor } from "unified";
import { visit } from "unist-util-visit";
/* eslint-enable import/namespace, import/no-deprecated, import/no-unresolved */

export interface OutlineNode {
  id: string;
  depth: number;
  label: string;
}

function getHeadingId({
  depth,
  textContent,
}: {
  depth: number;
  textContent: string;
}): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return hashSync(`${textContent}@${depth}`).slice(-16);
}

/**
 * a remark plugin that automatically assign hashed id to each heading.
 */
function remarkHeadingId(): (tree: MdastRoot) => void {
  return (tree) => {
    visit(tree, "heading", (node) => {
      const textContent = mdastToString(node);
      const { depth } = node;
      const id = getHeadingId({ textContent, depth });

      node.data ??= {};
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, unicorn/consistent-destructuring
      (node.data as any).hProperties ??= {};
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, unicorn/consistent-destructuring
      (node.data as any).hProperties.id = id;
    });
  };
}

/**
 * a rehype plugin that generates the list of heading nodes.
 */
function rehypeOutline(this: Processor): void {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  function compile(tree: HastRoot): OutlineNode[] {
    const outline: OutlineNode[] = [];

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
        const textContent = mdastToString(node);
        const depth = Number.parseInt(node.tagName.slice(1));
        const id = getHeadingId({ textContent, depth });

        outline.push({ id, depth, label: textContent });
      },
    );

    return outline;
  }

  this.compiler = compile as never;
}

export { remarkHeadingId, rehypeOutline };
