import styled from "@emotion/styled";
import * as React from "react";
import { DARK_COLOR, LIGHT_COLOR } from "../../constant/color";
import { MOBILE, DARK_MODE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";
import MarkdownTextThemeContext from "./MarkdownTextThemeContext";

interface Props extends React.Attributes {
  value: string;
  children?: React.ReactNode;
}

export default function Blockquote({ children, ...props }: Props) {
  return (
    <Root {...props}>
      <MarkdownTextThemeContext.Provider value={{ isEmphasized: true }}>
        {children}
      </MarkdownTextThemeContext.Provider>
    </Root>
  );
}

const Root = styled.blockquote`
  box-sizing: border-box;
  max-width: calc(100% + 32px * 2);
  width: calc(100% + 32px * 2);
  margin-block: 32px;
  margin-inline: -32px;
  padding-block: 32px;
  padding-inline: 32px;
  border-radius: 8px;
  background-color: ${LIGHT_COLOR[ThemedColor.accentBackground]};
  line-height: 1.333;
  overflow-x: scroll;

  ${MOBILE} {
    max-width: calc(100% + 20px * 2);
    width: calc(100% + 20px * 2);
    margin-block: 24px;
    margin-inline: -20px;
    padding-block: 24px;
    padding-inline: 24px;
    border-radius: 0;
  }

  ${DARK_MODE} {
    background-color: ${DARK_COLOR[ThemedColor.accentBackground]};
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
