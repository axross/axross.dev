import * as React from "react";
import MarkdownText from "./MarkdownText";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function ListItem({ children, ...props}: Props) {
  return (
    <li {...props}>
      {React.Children.map(children, (child) => typeof child === "string" ? <MarkdownText>{child}</MarkdownText> : child)}
    </li>
  );
}
