import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Deleted({ children }: Props) {
  return (
    <MarkdownTextThemeContext.Provider value={{ isDeleted: true }}>
      {children}
    </MarkdownTextThemeContext.Provider>
  );
}
