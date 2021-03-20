import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import GithubSlugger from "github-slugger";
import mdastToString from "mdast-util-to-string";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import { Transformer } from "unified";
import visit from "unist-util-visit";
import { ParrotAnchor } from "./anchor";
import { Blockquote } from "./blockquote";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { ImageFigure } from "./image-figure";
import { AppStoreBadge, GooglePlayBadge } from "./mobile-app-store-link";
import { WebpageEmbed } from "./webpage-embed";

interface MarkdownProps extends React.Attributes {
  markdown: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Markdown: React.VFC<MarkdownProps> = ({
  markdown,
  className,
  ...props
}) => {
  return (
    <ReactMarkdown
      renderers={components}
      plugins={[remarkDirective, appendHeadingId]}
      children={markdown}
      className={cx(
        css`
          --heading-1-font-size: calc(var(--font-size-md) * 2);
          --heading-2-font-size: calc(var(--font-size-md) * 1.8);
          --heading-3-font-size: calc(var(--font-size-md) * 1.42);
          --heading-4-font-size: calc(var(--font-size-md) * 1.2);
          --heading-5-font-size: calc(var(--font-size-md) * 1.1);
          --heading-6-font-size: var(--font-size-md);
          --section-margin: calc(var(--font-size-md) * 3);
          --block-margin: calc(var(--font-size-md) * 2);
          --paragraph-margin: calc(var(--block-margin) - 0.375em);

          line-height: 1.75;
          color: var(--color-fg);
          overflow-wrap: anywhere;
          word-break: break-all;

          > *:first-child {
            margin-block-start: 0;
          }

          > *:last-child {
            margin-block-end: 0;
          }

          > ${MdParagraph},
            > ${MdBlockquote},
            > ${MdHorizontalRule},
            > ${MdUnorderedList},
            > ${MdOrderedList},
            > ${MdTable},
            > ${MdCodeBlock},
            > ${MdImageFigure},
            > ${MdWebpageEmbed},
            > ${MdCallout} {
            margin-block-start: var(--block-margin);
          }

          > ${MdHeading1},
          > ${MdHeading2},
          > ${MdHeading3},
          > ${MdHeading4},
          > ${MdHeading5},
          > ${MdHeading6} {
            margin-block-start: calc(var(--section-margin) - var(--block-margin));
            padding-block-start: var(--block-margin);
          }

          > ${MdHeading1} + *,
          > ${MdHeading2} + *,
          > ${MdHeading3} + *,
          > ${MdHeading4} + *,
          > ${MdHeading5} + *,
          > ${MdHeading6} + * {
            margin-block-start: calc(var(--block-margin) * 0.5);
          }

          > ${MdHeading1} + ${MdHeading2},
          > ${MdHeading2} + ${MdHeading3},
          > ${MdHeading3} + ${MdHeading4},
          > ${MdHeading4} + ${MdHeading5},
          > ${MdHeading5} + ${MdHeading6} {
            margin-block-start: 0;
            padding-block-start: var(--block-margin);
          }

          
          ${MdParagraph} + ${MdParagraph} {
            margin-block-start: var(--paragraph-margin);
          }
        
        `,
        className
      )}
      {...props}
    />
  );
};

const MdHeading1 = styled.h1`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-1-font-size);
  font-weight: bold;
`;

const MdHeading2 = styled.h2`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-2-font-size);
  font-weight: bold;
`;

const MdHeading3 = styled.h3`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-3-font-size);
  font-weight: bold;
`;

const MdHeading4 = styled.h4`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-4-font-size);
  font-weight: bold;
`;

const MdHeading5 = styled.h5`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-5-font-size);
  font-weight: bold;
`;

const MdHeading6 = styled.h6`
  margin-block-start: 0;
  margin-block-end: 0;
  color: var(--color-fg-strong);
  font-size: var(--heading-6-font-size);
  font-weight: bold;
`;

const MdParagraph = styled.p`
  margin-block-end: 0;
`;

const MdHorizontalRule = styled.hr`
  width: 256px;
  margin-block-start: var(--space-xl);
  margin-block-end: var(--space-xl);
  margin-inline-start: auto;
  margin-inline-end: auto;
`;

const MdBlockquote = styled(Blockquote)`
  > *:nth-child(3) {
    margin-block-start: 0;
  }

  > *:nth-child(n + 4) {
    margin-block-start: var(--block-margin);
  }

  > p:nth-child(n + 4) {
    margin-block-start: 0;
  }
`;

const MdUnorderedList = styled.ul`
  padding-block-start: 0;
  padding-block-end: 0;
  padding-inline-start: 1.25em;

  > li {
    display: list-item;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;

    &::marker {
      color: #ffffff5f;
    }

    > p {
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }

    > ul,
    > ol {
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }
  }
`;

const MdOrderedList = styled.ol`
  padding-block-start: 0;
  padding-block-end: 0;
  padding-inline-start: 1.25em;

  > li {
    display: list-item;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;

    &::marker {
      color: var(--color-fg-weak);
    }

    > p {
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }

    > ul,
    > ol {
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }
  }
`;

const MdTable = styled.table`
  margin-inline-start: auto;
  margin-inline-end: auto;
  border-spacing: 0px;

  > thead {
    border: none;
    border-bottom: var(--color-fg) 1px solid;

    > th {
      border-bottom: 1px var(--color-fg) solid;
    }
  }

  > thead > th,
  > tbody > td {
    padding-block-start: var(--space-sm);
    padding-block-end: var(--space-sm);
    padding-inline-start: var(--space-sm);
    padding-inline-end: var(--space-sm);
    border-bottom: 1px var(--color-fg) solid;

    &:first-of-type {
      padding-inline-start: var(--space-md);
    }

    &:last-of-type {
      padding-inline-end: var(--space-md);
    }
  }
`;

const MdCodeBlock = styled(CodeBlock)``;

const MdStrong = styled.strong`
  color: var(--color-fg-strong);
  font-weight: bold;
`;

const MdEmphasized = styled.em`
  font-style: italic;
`;

const MdDeleted = styled.del`
  text-decoration: strike;
`;

const MdInlineCode = styled.code`
  padding-block-start: 0.25em;
  padding-block-end: 0.25em;
  padding-inline-start: 0.25em;
  padding-inline-end: 0.25em;
  background-color: var(--color-bg-gray-weak);
  border-radius: 4px;
  font-size: 0.888em;
  font-family: "Fira Code", monospace;
`;

const MdImage = styled.img`
  max-width: 100%;
  max-height: 75vh;
`;

const MdImageFigure = styled(ImageFigure)``;

const MdWebpageEmbed = styled(WebpageEmbed)``;

const MdCallout = styled(Callout)`
  > *:nth-child(2) {
    margin-block-start: 0;
  }
`;

const MdGooglePlayBadge = styled(GooglePlayBadge)`
  height: 40px;
`;

const MdAppStoreBadge = styled(AppStoreBadge)`
  height: 40px;
`;

export interface MdAnchorLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function MdAnchorLink({
  href,
  className,
  children,
  ...props
}: MdAnchorLinkProps) {
  return (
    <ParrotAnchor
      href={href}
      className={css`
        color: var(--color-fg-strong);
        font-weight: bold;
        text-decoration-line: underline;
        text-decoration-style: solid;
      `}
      {...props}
    >
      {children}
    </ParrotAnchor>
  );
}

export const components = {
  heading: React.memo(
    ({
      level,
      node: {
        data: { hProperties },
      },
      ...props
    }: any) => {
      switch (level) {
        case 1:
          return <MdHeading1 id={hProperties.id} {...props} />;
        case 2:
          return <MdHeading2 id={hProperties.id} {...props} />;
        case 3:
          return <MdHeading3 id={hProperties.id} {...props} />;
        case 4:
          return <MdHeading4 id={hProperties.id} {...props} />;
        case 5:
          return <MdHeading5 id={hProperties.id} {...props} />;
        case 6:
          return <MdHeading6 id={hProperties.id} {...props} />;
      }

      return null;
    }
  ),
  paragraph: MdParagraph,
  thematicBreak: MdHorizontalRule,
  blockquote: MdBlockquote,
  list: ({ ordered, children }: any) => {
    if (ordered) {
      return <MdOrderedList children={children} />;
    }

    return <MdUnorderedList children={children} />;
  },
  code: MdCodeBlock,
  table: MdTable,
  link: MdAnchorLink,
  inlineCode: MdInlineCode,
  strong: MdStrong,
  emphasis: MdEmphasized,
  del: MdDeleted,
  image: MdImage,
  containerDirective: ({ name, attributes, children }: any) => {
    switch (name) {
      case "callout":
        return <MdCallout {...attributes} children={children} />;
      default:
        return null;
    }
  },
  leafDirective: ({ name, attributes }: any) => {
    switch (name) {
      case "image-figure":
        return <MdImageFigure {...attributes} />;
      case "webpage-embed":
        return <MdWebpageEmbed {...attributes} />;
      default:
        return null;
    }
  },
  textDirective: ({ name, attributes }: any) => {
    switch (name) {
      case "google-play":
        return <MdGooglePlayBadge {...attributes} />;
      case "app-store":
        return <MdAppStoreBadge {...attributes} />;
      default:
        return null;
    }
  },
};

function appendHeadingId() {
  const transformer: Transformer = (tree) => {
    const githubSlugger = new GithubSlugger();

    visit(tree, "heading", (node) => {
      const id = githubSlugger.slug(mdastToString(node));

      node.id = id;
      node.data = {
        id,
        ...node.data,
        hProperties: {
          id,
          ...(node.data?.hProperties as any),
        },
      };
    });
  };

  return transformer;
}
