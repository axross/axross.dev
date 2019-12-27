import styled from "@emotion/styled";
import * as React from "react";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";
import { TextType } from "./MarkdownText";
import { MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  level: number;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ level, children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};
  let Component = H1;

  switch (level) {
    case 2:
      Component = H2;
      break;
    case 3:
      Component = H3;
      break;
    case 4:
      Component = H4;
      break;
    case 5:
      Component = H5;
      break;
    case 6:
      Component = H6;
      break;
  }

  return (
    <Component {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TYPES[level]
        }}
      >
        {children}
      </MarkdownTextThemeContext.Provider>
    </Component>
  );
}

const TYPES: Record<number, TextType> = {
  1: TextType.heading1,
  2: TextType.heading2,
  3: TextType.heading3,
  4: TextType.heading4,
  5: TextType.heading5,
  6: TextType.heading6
};

const H1 = styled.h1`
  box-sizing: border-box;
  margin-block-start: 52px;
  margin-block-end: 32px;

  ${MOBILE} {
    margin-block-start: 42px;
    margin-block-end: 24px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  h1 + &,
  h2 + &,
  h3 + &,
  h4 + &,
  h5 + &,
  h6 + & {
    margin-block-start: var(--block-padding);
  }
`;
const H2 = H1.withComponent("h2");
const H3 = H1.withComponent("h3");
const H4 = H1.withComponent("h4");
const H5 = H1.withComponent("h5");
const H6 = H1.withComponent("h6");
