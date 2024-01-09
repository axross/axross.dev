/* eslint-disable react/jsx-filename-extension */

import "server-only";

import { Children, ComponentPropsWithoutRef, type JSX } from "react";
// eslint-disable-next-line import/no-namespace
import * as jsxRuntime from "react/jsx-runtime";
/* eslint-disable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
/* eslint-enable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import { remarkHeadingId } from "~/helpers/remark";
import { WebpageEmbed } from "./webpage-embed";

// @ts-expect-error: the react types are missing.
const { Fragment, jsx, jsxs } = jsxRuntime;

async function Paragraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">): Promise<JSX.Element> {
  if (Children.count(children) === 1) {
    console.log(children);

    const child = Children.toArray(children)[0];

    console.log(child);

    if (
      typeof child === "object" &&
      child !== null &&
      child.type === "a" &&
      child.props.children === "bookmark" &&
      typeof child.props.href === "string"
    ) {
      return <WebpageEmbed href={child.props.href} />;
    }
  }

  return <p {...props}>{children}</p>;
}

export async function Markdown({
  markdown,
}: {
  markdown: string;
}): Promise<JSX.Element> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadingId)
    .use(remarkRehype)
    .use(rehypeReact, {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      Fragment,
      jsx,
      jsxs,
      /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      components: {
        p: Paragraph,
      },
    })
    .process(markdown);
  const elements = file.result as JSX.Element;

  return elements;
}
