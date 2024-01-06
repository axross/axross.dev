import "server-only";

import { unified } from "unified";
import type { JSX } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";

// @ts-expect-error: the react types are missing.
const { Fragment, jsx, jsxs } = JSXRuntime;

export async function Markdown({ markdown }: { markdown: string }): Promise<JSX.Element> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, { 
      Fragment,
      jsx,
      jsxs
    })
    .process(markdown);

  return file.result;
}
