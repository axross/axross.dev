import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";
import MarkdownText from "./MarkdownText";

interface Props extends React.Attributes {
  className?: string;
  children: React.ReactNode;
}

export default function Deleted({ children }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <MarkdownTextThemeContext.Provider value={{ ...theme, isDeleted: true }}>
      <MarkdownText>
        {children}
      </MarkdownText>
    </MarkdownTextThemeContext.Provider>
  );
}
