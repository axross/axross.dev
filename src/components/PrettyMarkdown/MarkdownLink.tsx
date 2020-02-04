import * as React from "react";
import ExternalLink from "../ExternalLink";
import RawText from "../RawText";

interface Props extends React.Attributes {
  href: string;
  children: React.ReactNode;
}

export default function MarkdownLink({ href, children }: Props) {
  return (
    <ExternalLink href={href}>
      {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
    </ExternalLink>
  );
}
