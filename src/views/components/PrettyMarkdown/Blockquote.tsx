import styled from "@emotion/styled";
import * as React from "react";
import ColorTheme, { ThemedColor } from "../../../entities/ColorTheme";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import { MOBILE } from "../../constant/mediaquery";
import ColorThemeContext from "../ColorThemeContext";

interface Props extends React.Attributes {
  value: string;
  children?: React.ReactNode;
}

export default function Blockquote({ children, ...props }: Props) {
  const colorTheme = React.useContext(ColorThemeContext);

  return (
    <Root _colorTheme={colorTheme} {...props}>
      {children}
    </Root>
  );
}

const Root = styled.blockquote<{ _colorTheme: ColorTheme }>`
  box-sizing: border-box;
  max-width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;
  margin-inline-start: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  margin-inline-end: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  padding-block-start: ${LAPTOP_PADDING_SIZE}px;
  padding-block-end: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-start: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-end: ${LAPTOP_PADDING_SIZE}px;
  border-radius: 8px;
  background-color: ${({ _colorTheme }) =>
    _colorTheme[ThemedColor.accentBackground]};
  font-style: italic;

  ${MOBILE} {
    max-width: calc(100% + 20px * 2);
    width: calc(100% + 20px * 2);
    margin-block-start: ${MOBILE_PADDING_SIZE}px;
    margin-block-end: ${MOBILE_PADDING_SIZE}px;
    margin-inline-start: -20px;
    margin-inline-end: -20px;
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_PADDING_SIZE}px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
    border-radius: 0;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
