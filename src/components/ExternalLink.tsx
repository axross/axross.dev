import * as React from "react";
import { RawTextThemeContext, TextColor } from "./RawText";

export interface Props extends React.Attributes {
  href: string;
  children?: React.ReactNode;
}

export default function ExternalLink({ children, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <RawTextThemeContext.Provider
        value={{
          ...theme,
          color: TextColor.primaryForeground,
          ...(isHovered ? { underline: true } : {}),
        }}
      >
        {children}
      </RawTextThemeContext.Provider>
    </a>
  );
}
