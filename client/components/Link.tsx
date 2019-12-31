import { Link as RouterLink, LinkProps } from "react-router-dom";
import * as React from "react";
import TextThemeContext from "./TextThemeContext";

export interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
    LinkProps {
  children?: React.ReactNode;
}

export default function Link({ children, ...props }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <RouterLink
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
    </RouterLink>
  );
}
