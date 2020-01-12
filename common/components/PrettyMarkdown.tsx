import MDX from "@mdx-js/runtime";
import * as React from "react";
import Blockquote from "./PrettyMarkdown/Blockquote";
import CodeBlock from "./PrettyMarkdown/CodeBlock";
import Emphasis from "./PrettyMarkdown/Emphasis";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "./PrettyMarkdown/Heading";
import InlineCode from "./PrettyMarkdown/InlineCode";
import MarkdownLink from "./PrettyMarkdown/MarkdownLink";
import MarkdownText from "./PrettyMarkdown/MarkdownText";
import Media from "./PrettyMarkdown/Media";
import OrderedList from "./PrettyMarkdown/OrderedList";
import Paragraph from "./PrettyMarkdown/Paragraph";
import Strong from "./PrettyMarkdown/Strong";
import UnorderedList from "./PrettyMarkdown/UnorderedList";
import Deleted from "./PrettyMarkdown/Deleted";
import ListItem from "./PrettyMarkdown/ListItem";
import EmbededLink from "./PrettyMarkdown/EmbededLink";

interface Props extends React.Attributes {
  children?: string;
}

export default function PrettyMarkdown({ children }: Props) {
  return <MDX components={components}>{children}</MDX>;
}

const components = {
  p: Paragraph,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  // disabled
  // thematicBreak: 
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  // disabled
  // table: 
  // tr: 
  // td: 
  pre: ({ children }: any) => children,
  code: CodeBlock,
  em: Emphasis,
  strong: Strong,
  delete: Deleted,
  inlineCode: InlineCode,
  // disabled
  // hr: 
  a: MarkdownLink,
  img: Media,
  text: MarkdownText,
  EmbededLink: EmbededLink,
};
