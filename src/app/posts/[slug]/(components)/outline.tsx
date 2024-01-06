import "server-only";

import { type JSX } from "react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { type OutlineNode, rehypeOutline } from "~/helpers/remark";

export async function Outline({
  markdown,
}: {
  markdown: string;
}): Promise<JSX.Element> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeOutline);

  const file = await processor.process(markdown);
  const outline = file.result as OutlineNode[];

  return (
    <ul>
      {outline.map((node) => {
        return <li key={node.id}>{node.label}</li>;
      })}
    </ul>
  );
}
