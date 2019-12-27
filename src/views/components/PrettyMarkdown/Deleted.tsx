import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Deleted({ children }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <MarkdownTextThemeContext.Provider value={{ ...theme, isDeleted: true }}>
      {children}
    </MarkdownTextThemeContext.Provider>
  );
}
