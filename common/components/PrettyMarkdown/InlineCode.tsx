import * as React from "react";
import LazyCSS from "../LazyCSS";
import MarkdownText from "./MarkdownText";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props {
  children?: string;
}

export default function CodeText({ children }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <>
      <LazyCSS
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap"
        key="sourceCodeFont"
      />

      <MarkdownTextThemeContext.Provider value={{ ...theme, isCode: true }}>
        <MarkdownText>{children}</MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </>
  );
}
