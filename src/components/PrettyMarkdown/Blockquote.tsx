import styled from "@emotion/styled";
import * as React from "react";
import { DARK_SECONDARY_FOREGROUND_COLOR, LIGHT_SECONDARY_FOREGROUND_COLOR } from "../../constant/color";
import { DARK_MODE, MOBILE } from "../../constant/mediaQuery";
import RawText, { RawTextThemeContext, TextColor } from "../RawText";

interface Props extends React.Attributes {
  className?: string;
  children?: React.ReactNode;
}

export default function Blockquote({ children, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <Root {...props}>
      <RawTextThemeContext.Provider value={{ ...theme, color: TextColor.secondaryForeground, italic: true }}>
        {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
      </RawTextThemeContext.Provider>
    </Root>
  );
}

const Root = styled.blockquote`
  box-sizing: border-box;
  width: calc(100% + 32px * 2);
  margin-block-start: 32px;
  margin-block-end: 32px;
  margin-inline-start: -32px;
  margin-inline-end: -32px;
  padding-block-start: 16px;
  padding-block-end: 16px;
  padding-inline-start: 26px;
  padding-inline-end: 32px;
  border-left-width: 6px;
  border-left-color: ${LIGHT_SECONDARY_FOREGROUND_COLOR};
  border-left-style: solid;
  line-height: 1.333;
  overflow-x: scroll;

  ${MOBILE} {
    width: 100vw;
    margin-block-start: 24px;
    margin-block-end: 24px;
    margin-inline-start: calc(-1 * (100vw - 100%) / 2);
    margin-inline-end: calc(-1 * (100vw - 100%) / 2);
    padding-block-start: 10px;
    padding-block-end: 10px;
    padding-inline-start: calc((100vw - 100%) / 2 - 4px);
    padding-inline-end: calc((100vw - 100%) / 2);
    border-left-width: 4px;
  }

  ${DARK_MODE} {
    border-left-color: ${DARK_SECONDARY_FOREGROUND_COLOR};
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
