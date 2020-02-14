import MDX from "@mdx-js/runtime";
import * as React from "react";
import Blockquote from "./Blockquote";
import CodeBlock from "./CodeBlock";
import Emphasis from "./Emphasis";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from "./Heading";
import InlineCode from "./InlineCode";
import MarkdownLink from "./MarkdownLink";
import Media from "./Media";
import OrderedList from "./OrderedList";
import Paragraph from "./Paragraph";
import Strong from "./Strong";
import UnorderedList from "./UnorderedList";
import Deleted from "./Deleted";
import ListItem from "./ListItem";
import EmbededLink from "./EmbededLink";
import RawText, { RawTextThemeContext, TextLineSize } from "../RawText";

interface Props extends React.Attributes {
  children?: string;
}

export default function PrettyMarkdown({ children }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  
  return (
    <RawTextThemeContext.Provider value={{ ...theme, lineSize: TextLineSize.large }}>
      <MDX components={components}>{children}</MDX>
    </RawTextThemeContext.Provider>
  );
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
  text: RawText,
  EmbededLink: EmbededLink,
};
