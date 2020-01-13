import * as React from "react";
import ExternalLink from "../ExternalLink";
import RawText from "../RawText";
import RawTextThemeContext from "../RawTextThemeContext";

interface Props extends React.Attributes {
  href: string;
  children: React.ReactNode;
}

export default function MarkdownLink({ href, children }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <RawTextThemeContext.Provider value={{ ...theme, italic: true }}>
      <ExternalLink href={href}>
        {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
      </ExternalLink>
    </RawTextThemeContext.Provider>
  );
}
