import styled from "@emotion/styled";
import Head from "next/head";
import * as React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { MEDIA_MOBILE } from "../constant/mediaquery";
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
          href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,700&display=swap&subset=japanese"
          rel="stylesheet"
          key="notoSerifFont"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
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
  --title-font-size: ${LAPTOP_TITLE_SIZE}px;
  --subtitle-font-size: ${LAPTOP_SUBTITLE_SIZE}px;
  --subtitle2-font-size: ${LAPTOP_SUBTITLE2_SIZE}px;
  --subtitl3-font-size: ${LAPTOP_SUBTITLE3_SIZE}px;
  --block-padding: ${LAPTOP_PADDING_SIZE}px;
  --major-block-padding: ${LAPTOP_MAJOR_PADDING_SIZE}px;
  --minor-block-padding: ${LAPTOP_MINOR_PADDING_SIZE}px;

  color: ${TextColor.normal};
  font-family: "Noto Serif JP";
  font-size: var(--font-size);
  font-weight: normal;
  text-align: start;
  line-height: 1.75;
  word-break: break-word;

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
    color: ${TextColor.black};
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
    font-size: var(--title-font-size);
    font-weight: bold;
  }

  h2 {
    /* font-size: 40px; */
    font-size: var(--subtitle-font-size);
    font-weight: bold;
  }

  h3 {
    /* font-size: 30px; */
    font-size: var(--subtitle2-font-size);
    font-weight: bold;
  }

  h4 {
    font-size: var(--subtitle3-font-size);
    font-weight: bold;
  }

  h5 {
    font-size: var(--subtitle3-font-size);
  }

  h6 {
    font-weight: bold;
  }

  blockquote {
    background-color: ${TextColor.normal}20;
    font-style: italic;
  }

  code {
    background-color: ${TextColor.normal}08;
    font-family: "Source Code Pro";
    margin-inline-start: -8px;
    margin-inline-end: -8px;
    padding-block-start: 4px;
    padding-block-end: 4px;
    padding-inline-start: 8px;
    padding-inline-end: 8px;
    border-radius: 4px;
  }

  pre {
    background-color: ${TextColor.normal}08;
    line-height: 1.5;
    overflow-x: scroll;

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
    }
  }

  table {
    border-collapse: inherit;
    border-spacing: inherit;
    border: 1px ${TextColor.secondaryHighlight} solid;
    border-radius: 8px;

    tr {
      th,
      td {
        padding-block-start: var(--minor-block-padding);
        padding-block-end: var(--minor-block-padding);
        padding-inline-start: var(--block-padding);
        border-bottom: 1px ${TextColor.secondaryHighlight} solid;

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
    border-top: 1px ${TextColor.secondary}7f solid;
  }

  img {
    max-width: 100%;
    max-height: 800px;
    border-radius: 8px;
  }

  a {
    color: ${TextColor.primary};
    text-decoration: none;

    &:hover {
      color: ${TextColor.primaryHighlight};
      text-decoration: underline ${TextColor.primaryHighlight};
    }
  }

  strong {
    font-weight: bold;
  }

  ${MEDIA_MOBILE} {
    --font-size: ${MOBILE_TEXT_SIZE}px;
    --title-font-size: ${MOBILE_TITLE_SIZE}px;
    --subtitle-font-size: ${MOBILE_SUBTITLE_SIZE}px;
    --subtitle2-font-size: ${MOBILE_SUBTITLE2_SIZE}px;
    --subtitl3-font-size: ${MOBILE_SUBTITLE3_SIZE}px;
    --block-padding: ${MOBILE_PADDING_SIZE}px;
    --major-block-padding: ${MOBILE_MAJOR_PADDING_SIZE}px;
    --minor-block-padding: ${MOBILE_MINOR_PADDING_SIZE}px;

    blockquote,
    pre {
      max-width: calc(100% + 20px * 2);
      width: calc(100% + 20px * 2);
      margin-inline-start: -20px;
      margin-inline-end: -20px;
      padding-inline-start: 20px;
      padding-inline-end: 20px;
      border-radius: 0;
    }
  }
`;

const Code = styled(SyntaxHighlighter)`
  color: #323449;

  .token.comment {
    color: ${TextColor.secondary};
  }

  .token.keyword {
    color: #0bacdb;
  }

  .token.function {
    color: ${TextColor.primary};
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
