import styled from "@emotion/styled";
import * as React from "react";
import ColorTheme, { ThemedColor } from "../../../entities/ColorTheme";
import { MOBILE } from "../../constant/mediaquery";
import { MOBILE_TEXT_SIZE, LAPTOP_TEXT_SIZE } from "../../constant/size";
import ColorThemeContext from "../ColorThemeContext";

interface Props extends React.Attributes {}

export default function InlineCode(props: Props) {
  const colorTheme = React.useContext(ColorThemeContext);

  return <Root _colorTheme={colorTheme} {...props} />;
}

const Root = styled.code<{ _colorTheme: ColorTheme }>`
  box-sizing: border-box;

  background-color: ${({ _colorTheme }) =>
    _colorTheme[ThemedColor.secondaryForeground]};
  margin-inline-start: -0.2em;
  margin-inline-end: -0.2em;
  padding-block-start: 0.2em;
  padding-block-end: 0.2em;
  padding-inline-start: 0.2em;
  padding-inline-end: 0.2em;
  border-radius: 4px;
  line-height: 1.75;
  color: ${({ _colorTheme }) => _colorTheme[ThemedColor.foreground]};
  font-size: ${LAPTOP_TEXT_SIZE}px;
  font-family: "Source Code Pro", monospace;
  font-weight: 500;
  text-align: start;
  word-break: break-word;

  ${MOBILE} {
    font-size: ${MOBILE_TEXT_SIZE}px;
  }
`;
