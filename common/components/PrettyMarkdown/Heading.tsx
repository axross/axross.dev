import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";
import MarkdownText, { TextType } from "./MarkdownText";

interface Props extends React.Attributes {
  className?: string;
  children: React.ReactNode;
}

export function Heading1({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H1 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading1,
        }}
      >
        <MarkdownText>
          {children}
        </MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </H1>
  );
}

export function Heading2({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H2 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading2,
        }}
      >
        <MarkdownText>
          {children}
        </MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </H2>
  );
}

export function Heading3({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H3 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading3,
        }}
      >
        <MarkdownText>
          {children}
        </MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </H3>
  );
}

export function Heading4({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H4 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading4,
        }}
      >
        {children}
      </MarkdownTextThemeContext.Provider>
    </H4>
  );
}

export function Heading5({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H5 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading5,
        }}
      >
        <MarkdownText>
          {children}
        </MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </H5>
  );
}

export function Heading6({ children, ...props }: Props) {
  const theme = React.useContext(MarkdownTextThemeContext) ?? {};

  return (
    <H6 {...props}>
      <MarkdownTextThemeContext.Provider
        value={{
          ...theme,
          color: ThemedColor.emphasizedForeground,
          type: TextType.heading6,
        }}
      >
        <MarkdownText>
          {children}
        </MarkdownText>
      </MarkdownTextThemeContext.Provider>
    </H6>
  );
}

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
