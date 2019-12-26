import * as React from "react";
import Markdown from "react-markdown";
import LazyCSS from "./LazyCSS";
import MarkdownText from "./PrettyMarkdown/MarkdownText";
import Blockquote from "./PrettyMarkdown/Blockquote";
import CodeBlock from "./PrettyMarkdown/CodeBlock";
import Emphasis from "./PrettyMarkdown/Emphasis";
import Heading from "./PrettyMarkdown/Heading";
import InlineCode from "./PrettyMarkdown/InlineCode";
import MarkdownLink from "./PrettyMarkdown/MarkdownLink";
import Media from "./PrettyMarkdown/Media";
import Paragraph from "./PrettyMarkdown/Paragraph";
import Strong from "./PrettyMarkdown/Strong";
import UnorderedList from "./PrettyMarkdown/UnorderedList";

interface Props extends React.Attributes {
  className?: string;
  children?: string;
}

export default function PrettyMarkdown({ ...props }: Props) {
  return (
    <>
      <LazyCSS
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&display=swap"
        key="sansSerifFont"
      />

      <LazyCSS
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap"
        key="sourceCodeFont"
      />

      <Markdown renderers={renderers} {...props} />
    </>
  );
}

const renderers = {
  paragraph: Paragraph,
  heading: Heading,
  blockquote: Blockquote,
  code: CodeBlock,
  list: UnorderedList,
  image: Media,
  strong: Strong,
  emphasis: Emphasis,
  link: MarkdownLink,
  text: MarkdownText,
  inlineCode: InlineCode
};
