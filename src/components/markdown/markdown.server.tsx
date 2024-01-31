import "server-only";

import { clsx } from "clsx";
import {
  Children,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
  isValidElement,
} from "react";
import { ServerResolvedBookmark } from "~/components/bookmark";
import { CodeBlock } from "~/components/code-block";
import {
  Prose,
  ProseAnchorLink,
  ProseBlockquote,
  ProseDescriptionTerm,
  ProseH1,
  ProseH2,
  ProseH3,
  ProseHorizontalRuler,
  ProseImage,
  ProseListItem,
  ProseOrderedList,
  ProseParagraph,
  ProseStrong,
  ProseUnorderedList,
} from "~/components/markdown/prose";
import css from "./markdown.module.css";
import { type MarkdownComponents, processMarkdown } from "./process-markdown";

function Paragraph({
  children,
  ...props
}: ComponentPropsWithoutRef<"p">): JSX.Element {
  if (Children.count(children) === 1) {
    const child = Children.toArray(children)[0];

    if (
      isValidElement<ComponentPropsWithoutRef<"a">>(child) &&
      child.type === ProseAnchorLink &&
      child.props.children === "bookmark" &&
      child.props.href !== undefined
    ) {
      return (
        <ServerResolvedBookmark
          href={child.props.href}
          className={css.bookmark}
        />
      );
    }
  }

  return <ProseParagraph {...props}>{children}</ProseParagraph>;
}

function Pre({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">): JSX.Element {
  if (Children.count(children) === 1) {
    const child = Children.toArray(children)[0];

    if (
      isValidElement<ComponentPropsWithoutRef<"code">>(child) &&
      child.type === "code"
    ) {
      return (
        <CodeBlock
          lang={child.props.className?.replace("language-", "")}
          code={child.props.children?.toString() ?? ""}
        />
      );
    }
  }

  return <pre {...props}>{children}</pre>;
}

const components: MarkdownComponents = {
  // eslint-disable-next-line id-length
  a: ProseAnchorLink,
  blockquote: ProseBlockquote,
  dt: ProseDescriptionTerm,
  h1: ProseH1,
  h2: ProseH2,
  h3: ProseH3,
  hr: ProseHorizontalRuler,
  li: ProseListItem,
  ol: ProseOrderedList,
  // eslint-disable-next-line id-length
  p: Paragraph,
  strong: ProseStrong,
  ul: ProseUnorderedList,
  pre: Pre,
  img: ProseImage,
};

export async function Markdown({
  markdown,
  className,
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Prose>, "children"> & {
  markdown: string;
  children?: (renderProps: { children: ReactNode }) => JSX.Element;
}): Promise<JSX.Element> {
  let resolvedChildren = await processMarkdown({ markdown, components });

  if (children !== undefined) {
    resolvedChildren = children({ children: resolvedChildren });
  }

  return (
    <Prose className={clsx(css.root, className)} {...props}>
      {resolvedChildren}
    </Prose>
  );
}
