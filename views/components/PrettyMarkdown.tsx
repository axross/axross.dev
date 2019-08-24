import styled from "@emotion/styled";
import Head from "next/head";
import * as React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FOREGROUND_COLORS } from "../constant/color";
import { DARK_MODE, MOBILE } from "../constant/mediaquery";
import {
  MOBILE_MAJOR_PADDING_SIZE,
  MOBILE_MINOR_PADDING_SIZE,
  MOBILE_PADDING_SIZE,
  MOBILE_SUBTITLE_SIZE,
  MOBILE_SUBTITLE2_SIZE,
  MOBILE_SUBTITLE3_SIZE,
  MOBILE_TEXT_SIZE,
  MOBILE_TITLE_SIZE,
  LAPTOP_MAJOR_PADDING_SIZE,
  LAPTOP_MINOR_PADDING_SIZE,
  LAPTOP_PADDING_SIZE,
  LAPTOP_SUBTITLE_SIZE,
  LAPTOP_SUBTITLE2_SIZE,
  LAPTOP_SUBTITLE3_SIZE,
  LAPTOP_TEXT_SIZE,
  LAPTOP_TITLE_SIZE
} from "../constant/size";
import { TextColor } from "./Text";

interface Props extends React.Attributes {
  className?: string;
  children?: string;
}

function PrettyMarkdown({ ...props }: Props) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700|Open+Sans:400,700&display=swap&subset=japanese"
          rel="stylesheet"
          key="sansFont"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap"
          rel="stylesheet"
          key="sourceCodeFont"
        />
      </Head>

      <Root
        renderers={{
          text: ({ value, nodeKey, ...props }: any) => (
            <span {...props} key={nodeKey} />
          ),
          code: ({ language, value }: any) => {
            return (
              <Code
                language={language}
                children={value}
                // disable default style
                style={{}}
                // workaround. disable default inline style "background-color: rgba(255, 255, 255)"
                customStyle={{ backgroundColor: undefined }}
              />
            );
          }
        }}
        {...props}
      />
    </>
  );
}

const Root = styled(Markdown)`
  --font-size: ${LAPTOP_TEXT_SIZE}px;
  --block-padding: ${LAPTOP_PADDING_SIZE}px;
  --major-block-padding: ${LAPTOP_MAJOR_PADDING_SIZE}px;
  --minor-block-padding: ${LAPTOP_MINOR_PADDING_SIZE}px;

  ${MOBILE} {
    --font-size: ${MOBILE_TEXT_SIZE}px;
    --block-padding: ${MOBILE_PADDING_SIZE}px;
    --major-block-padding: ${MOBILE_MAJOR_PADDING_SIZE}px;
    --minor-block-padding: ${MOBILE_MINOR_PADDING_SIZE}px;
  }

  color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light};
  font-family: "Open Sans", "Noto Sans JP";
  font-size: var(--font-size);
  font-weight: normal;
  text-align: start;
  line-height: 1.75;
  word-break: break-word;

  ${DARK_MODE} {
    color: ${FOREGROUND_COLORS.get(TextColor.normal)!.dark};
  }

  * {
    box-sizing: border-box;
    max-width: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  pre,
  blockquote {
    width: 100%;
  }

  p,
  ul,
  ol,
  pre,
  blockquote {
    margin-block-start: var(--block-padding);
    margin-block-end: var(--block-padding);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: var(--major-block-padding);
    margin-block-end: var(--block-padding);
    color: ${FOREGROUND_COLORS.get(TextColor.highlight)!.light};

    ${DARK_MODE} {
      color: ${FOREGROUND_COLORS.get(TextColor.highlight)!.dark};
    }
  }

  p:first-child,
  ul:first-child,
  ol:first-child,
  pre:first-child,
  blockquote:first-child,
  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child,
  h5:first-child,
  h6:first-child {
    margin-block-start: 0;
  }

  p:last-child,
  ul:last-child,
  ol:last-child,
  pre:last-child,
  blockquote:last-child,
  h1:last-child,
  h2:last-child,
  h3:last-child,
  h4:last-child,
  h5:last-child,
  h6:last-child {
    margin-block-end: 0;
  }

  h1 + h2,
  h1 + h3,
  h1 + h4,
  h1 + h5,
  h1 + h6,
  h2 + h3,
  h2 + h4,
  h2 + h5,
  h2 + h6,
  h3 + h4,
  h3 + h5,
  h3 + h6,
  h4 + h5,
  h4 + h6,
  h5 + h6 {
    margin-block-start: var(--block-padding);
  }

  blockquote,
  pre {
    max-width: calc(100% + var(--block-padding) * 2);
    width: calc(100% + var(--block-padding) * 2);
    margin-inline-start: calc(-1 * var(--block-padding));
    margin-inline-end: calc(-1 * var(--block-padding));
    padding-block-start: var(--block-padding);
    padding-block-end: var(--block-padding);
    padding-inline-start: var(--block-padding);
    padding-inline-end: var(--block-padding);
    border-radius: 8px;

    ${MOBILE} {
      max-width: calc(100% + 20px * 2);
      width: calc(100% + 20px * 2);
      margin-inline-start: -20px;
      margin-inline-end: -20px;
      padding-inline-start: 20px;
      padding-inline-end: 20px;
      border-radius: 0;
    }
  }

  ul,
  ol {
    display: block;
    padding-inline-start: 36px;

    li {
      display: list-item;
      margin-block-start: var(--minor-block-padding);
      margin-block-end: var(--minor-block-padding);

      &:first-of-type {
        margin-block-start: 0;
      }

      &:last-of-type {
        margin-block-end: 0;
      }

      & > p:first-of-type {
        display: inline;
      }

      & > p + ul,
      & > p + ol,
      & > span + ul,
      & > span + ol {
        margin-block-start: var(--minor-block-padding);
      }
    }
  }

  h1 {
    font-size: ${LAPTOP_TITLE_SIZE}px;
    font-weight: bold;

    ${MOBILE} {
      font-size: ${MOBILE_TITLE_SIZE}px;
    }
  }

  h2 {
    font-size: ${LAPTOP_SUBTITLE_SIZE}px;
    font-weight: bold;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE_SIZE}px;
    }
  }

  h3 {
    font-size: ${LAPTOP_SUBTITLE2_SIZE}px;
    font-weight: bold;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE2_SIZE}px;
    }
  }

  h4,
  h5 {
    font-size: ${LAPTOP_SUBTITLE3_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE3_SIZE}px;
    }
  }

  h4 {
    font-weight: bold;
  }

  h6 {
    font-weight: bold;
  }

  blockquote {
    background-color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light}10;
    font-style: italic;

    ${DARK_MODE} {
      background-color: #00000040;
    }
  }

  code {
    background-color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light}10;
    font-family: "Source Code Pro";
    font-weight: 500;
    margin-inline-start: -8px;
    margin-inline-end: -8px;
    padding-block-start: 4px;
    padding-block-end: 4px;
    padding-inline-start: 8px;
    padding-inline-end: 8px;
    border-radius: 4px;

    ${DARK_MODE} {
      background-color: #00000040;
    }
  }

  pre {
    background-color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light}10;
    line-height: 1.333;
    overflow-x: scroll;

    ${DARK_MODE} {
      background-color: #00000040;
    }

    code {
      background-color: transparent;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-block-start: 0;
      padding-block-end: 0;
      padding-inline-start: 0;
      padding-inline-end: 0;
      border-radius: 0;
      font-size: calc(var(--font-size) * 0.8);
      font-family: "Source Code Pro";
      font-weight: 500;
    }
  }

  table {
    border-collapse: inherit;
    border-spacing: inherit;
    border-width: 1px;
    border-color: ${FOREGROUND_COLORS.get(TextColor.secondaryHighlight)!.light};
    border-style: solid;
    border-radius: 8px;

    ${DARK_MODE} {
      border-color: ${FOREGROUND_COLORS.get(TextColor.secondaryHighlight)!
        .dark};
    }

    tr {
      th,
      td {
        padding-block-start: var(--minor-block-padding);
        padding-block-end: var(--minor-block-padding);
        padding-inline-start: var(--block-padding);
        border-bottom-width: 1px;
        border-bottom-color: ${FOREGROUND_COLORS.get(
          TextColor.secondaryHighlight
        )!.light};
        border-bottom-style: solid;

        ${DARK_MODE} {
          border-bottom-color: ${FOREGROUND_COLORS.get(
            TextColor.secondaryHighlight
          )!.dark};
        }

        &:last-child {
          padding-inline-end: var(--block-padding);
        }
      }

      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }

  hr {
    border: none;
    border-top-width: 1px;
    border-top-color: ${FOREGROUND_COLORS.get(TextColor.secondary)!.light}80;
    border-top-style: solid;

    ${DARK_MODE} {
      border-top-color: ${FOREGROUND_COLORS.get(TextColor.secondary)!.dark}80;
    }
  }

  img {
    max-width: 100%;
    max-height: 800px;
    border-radius: 8px;
  }

  a {
    color: ${FOREGROUND_COLORS.get(TextColor.primary)!.light};
    text-decoration: none;

    ${DARK_MODE} {
      color: ${FOREGROUND_COLORS.get(TextColor.primary)!.dark};
    }

    &:hover {
      color: ${FOREGROUND_COLORS.get(TextColor.primaryHighlight)!.light};
      text-decoration: underline ${TextColor.primaryHighlight};

      ${DARK_MODE} {
        color: ${FOREGROUND_COLORS.get(TextColor.primaryHighlight)!.dark};
      }
    }
  }

  strong {
    font-weight: bold;
  }
`;

const Code = styled(SyntaxHighlighter)`
  color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light};

  ${DARK_MODE} {
    color: ${FOREGROUND_COLORS.get(TextColor.normal)!.dark};
  }

  .token.comment {
    color: ${FOREGROUND_COLORS.get(TextColor.secondary)!.light}80;

    ${DARK_MODE} {
      color: ${FOREGROUND_COLORS.get(TextColor.secondary)!.dark}80;
    }
  }

  .token.keyword {
    color: #0bacdb;
  }

  .token.function {
    color: ${FOREGROUND_COLORS.get(TextColor.primary)!.light};

    ${DARK_MODE} {
      color: ${FOREGROUND_COLORS.get(TextColor.primary)!.dark};
    }
  }

  .token.string {
    color: #b3ab47;
  }

  .token.number,
  .token.interpolation {
    color: #ff6c80;
  }
`;

export default PrettyMarkdown;
