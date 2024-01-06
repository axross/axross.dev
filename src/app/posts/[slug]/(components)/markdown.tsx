import "server-only";

import { type JSX } from "react";
// eslint-disable-next-line import/no-namespace
import * as jsxRuntime from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// @ts-expect-error: the react types are missing.
const { Fragment, jsx, jsxs } = jsxRuntime;

export async function Markdown({
  markdown,
}: {
  markdown: string;
}): Promise<JSX.Element> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      Fragment,
      jsx,
      jsxs,
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    })
    .process(markdown);
  const elements = file.result as JSX.Element;

  return <>{elements}</>;
}
