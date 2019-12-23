import * as React from "react";
import { ThemedColor } from "../../entities/ColorTheme";
import TextThemeContext from "./TextThemeContext";

export interface Props extends React.Attributes {
  href: string;
  children?: React.ReactNode;
}

export default function ExternalLink({ children, ...props }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <TextThemeContext.Provider
        value={{
          color: isHovered
            ? ThemedColor.primaryForeground
            : ThemedColor.primaryForeground,
          underline: isHovered
        }}
      >
        {children}
      </TextThemeContext.Provider>
    </a>
  );
}
