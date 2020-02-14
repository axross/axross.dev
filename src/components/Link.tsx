import NextLink, { LinkProps as NextLinkProps } from "next/link";
import * as React from "react";
import { RawTextThemeContext, ThemedColor } from "./RawText";

export interface Props extends NextLinkProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Link({ className, children, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <NextLink passHref {...props}>
      <a
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
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
      </a>
    </NextLink>
  );
}
