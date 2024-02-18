import "server-only";

import { type JSX } from "react";
// eslint-disable-next-line import/no-namespace
import * as jsxRuntime from "react/jsx-runtime";
/* eslint-disable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import rehypeReact, { type Options as RehypeReactOptions } from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
/* eslint-enable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import { remarkHeadingId } from "~/helpers/remark";

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Fragment, jsx, jsxs } = jsxRuntime;

// eslint-disable-next-line @typescript-eslint/no-type-alias
type MarkdownComponents = RehypeReactOptions["components"];

async function processMarkdown({
  markdown,
  components,
}: {
  markdown: string;
  components: MarkdownComponents;
}): Promise<JSX.Element> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadingId)
    .use(remarkRehype)
    .use(rehypeReact, {
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unsafe-assignment
      Fragment,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jsx,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jsxs,
      components,
    })
    .process(markdown);

  return file.result;
}

export type { MarkdownComponents };
export { processMarkdown };
