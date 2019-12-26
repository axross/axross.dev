import NextLink, { LinkProps } from "next/link";
import * as React from "react";
import TextThemeContext from "./TextThemeContext";

export interface Props extends LinkProps {
  children?: React.ReactNode;
}

export default function Link({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  children,
  ...props
}: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch }}>
      <a
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <TextThemeContext.Provider
          value={{
            isLink: true,
            isLinkHovered: isHovered
          }}
        >
          {children}
        </TextThemeContext.Provider>
      </a>
    </NextLink>
  );
}
