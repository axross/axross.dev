import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

export interface Props extends React.Attributes {
  href: string;
  children?: React.ReactNode;
}

export default function MarkdownLink({ children, ...props }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <MarkdownTextThemeContext.Provider
        value={{
          isLink: true,
          isLinkHovered: isHovered
        }}
      >
        {children}
      </MarkdownTextThemeContext.Provider>
    </a>
  );
}
