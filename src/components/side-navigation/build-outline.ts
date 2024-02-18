/* eslint-disable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
/* eslint-enable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import { type OutlineNode, rehypeOutline } from "~/helpers/remark";

async function buildOutline({
  markdown,
}: {
  markdown: string;
}): Promise<OutlineNode[]> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeOutline);

  const file = await processor.process(markdown);

  return file.result as OutlineNode[];
}

export { buildOutline };
