import * as React from "react";
import * as Markdown from "react-markdown";
import LazyCSS from "./LazyCSS";
import Blockquote from "./PrettyMarkdown/Blockquote";
import CodeBlock from "./PrettyMarkdown/CodeBlock";
import Emphasis from "./PrettyMarkdown/Emphasis";
import Heading from "./PrettyMarkdown/Heading";
import InlineCode from "./PrettyMarkdown/InlineCode";
import List from "./PrettyMarkdown/List";
import MarkdownLink from "./PrettyMarkdown/MarkdownLink";
import MarkdownText from "./PrettyMarkdown/MarkdownText";
import Media from "./PrettyMarkdown/Media";
import Paragraph from "./PrettyMarkdown/Paragraph";
import Strong from "./PrettyMarkdown/Strong";

interface Props extends React.Attributes {
  className?: string;
  children?: string;
}

export default function PrettyMarkdown({ ...props }: Props) {
  return <Markdown renderers={renderers} {...props} />;
}

const renderers = {
  paragraph: Paragraph,
  heading: Heading,
  blockquote: Blockquote,
  code: CodeBlock,
  list: List,
  image: Media,
  strong: Strong,
  emphasis: Emphasis,
  link: MarkdownLink,
  text: MarkdownText,
  inlineCode: InlineCode
};
