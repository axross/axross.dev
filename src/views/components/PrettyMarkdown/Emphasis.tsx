import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Emphasis({ children }: Props) {
  return (
    <MarkdownTextThemeContext.Provider value={{ isEmphasized: true }}>
      {children}
    </MarkdownTextThemeContext.Provider>
  );
}
