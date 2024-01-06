import { hashSync } from "hasha";
// eslint-disable-next-line import/no-unresolved
import { type Root as HastRoot } from "hast";
/* eslint-disable import/namespace, import/no-deprecated */
import { toString as mdastToString } from "mdast-util-to-string";
import { type Processor } from "unified";
import { visit } from "unist-util-visit";
/* eslint-enable import/namespace, import/no-deprecated */

export interface OutlineNode {
  id: string;
  depth: number;
  label: string;
}

export function rehypeOutline(this: Processor): void {
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
        const label = mdastToString(node);
        const depth = Number.parseInt(node.tagName.slice(1));
        const id = hashSync(`${label}@${depth}`);

        outline.push({ id, depth, label });
      }
    );

    return outline;
  }

  this.compiler = compile as never;
}
