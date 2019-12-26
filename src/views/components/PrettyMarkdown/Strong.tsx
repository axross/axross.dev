import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Strong({ children }: Props) {
  return (
    <MarkdownTextThemeContext.Provider value={{ isStrong: true }}>
      {children}
    </MarkdownTextThemeContext.Provider>
  );
}
