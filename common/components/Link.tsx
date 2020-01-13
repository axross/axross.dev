import * as React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import RawTextThemeContext, { ThemedColor } from "./RawTextThemeContext";

export interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
    LinkProps {
  children?: React.ReactNode;
}

export default function Link({ children, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <RouterLink
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <RawTextThemeContext.Provider
        value={{
          ...theme,
          ...isHovered ? { underline: true } : {},
          color: ThemedColor.primaryForeground,
        }}
      >
        {children}
      </RawTextThemeContext.Provider>
    </RouterLink>
  );
}
