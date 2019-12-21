import * as React from "react";
import TextThemeContext from "../TextThemeContext";
import { TextColor } from "../Text";

interface Props extends React.Attributes {
  className?: string;
  children?: React.ReactNode;
}

export default function Link({ children, ...props }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <a
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <TextThemeContext.Provider
        value={{
          color: isHovered ? TextColor.primaryHighlight : TextColor.primary,
          underline: isHovered
        }}
      >
        {children}
      </TextThemeContext.Provider>
    </a>
  );
}
