import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";
import MarkdownText from "./MarkdownText";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Strong({ children }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <MarkdownTextThemeContext.Provider value={{ ...theme, isStrong: true }}>
      <MarkdownText>
        {children}
      </MarkdownText>
    </MarkdownTextThemeContext.Provider>
  );
}
