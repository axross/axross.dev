import styled from "@emotion/styled";
import * as React from "react";
import { ThemedColor } from "../../../entities/ColorTheme";
import ScreenSizeContext, { ScreenSize } from "../ScreenSizeContext";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";
import { TextType } from "./MarkdownText";

interface Props extends React.Attributes {
  level: number;
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ level, children, ...props }: Props) {
  const screenSize = React.useContext(ScreenSizeContext);
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
    <Component _screenSize={screenSize} {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          color: ThemedColor.emphasizedForeground,
          type: TYPES[level],
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
  6: TextType.heading6,
};

const H1 = styled.h1<{ _screenSize: ScreenSize }>`
  box-sizing: border-box;
  margin-block-start: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? 52 : 42}px;
  margin-block-end: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? 32 : 24}px;

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
