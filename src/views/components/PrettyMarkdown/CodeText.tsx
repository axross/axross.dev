import styled from "@emotion/styled";
import * as React from "react";
import ColorTheme, { ThemedColor } from "../../../entities/ColorTheme";
import { MOBILE } from "../../constant/mediaquery";
import {
  LAPTOP_SUBTITLE_SIZE,
  LAPTOP_SUBTITLE2_SIZE,
  LAPTOP_SUBTITLE3_SIZE,
  LAPTOP_TEXT_SIZE,
  LAPTOP_TITLE_SIZE,
  MOBILE_SUBTITLE_SIZE,
  MOBILE_SUBTITLE2_SIZE,
  MOBILE_SUBTITLE3_SIZE,
  MOBILE_TEXT_SIZE,
  MOBILE_TITLE_SIZE
} from "../../constant/size";
import mergeValues from "../../utility/mergeValues";
import LazyCSS from "../LazyCSS";
import { TextSize } from "../Text";
import TextThemeContext, { TextTheme } from "../TextThemeContext";
import ColorThemeContext from "../ColorThemeContext";

interface Props extends React.Attributes {
  color?: ThemedColor;
  size?: TextSize;
  className?: string;
  children?: string;
}

export default function CodeText({ color, size, ...props }: Props) {
  const colorTheme = React.useContext(ColorThemeContext);
  const textTheme: TextTheme = React.useContext(TextThemeContext) || {};
  const _color = mergeValues(color, textTheme.color, ThemedColor.foreground);
  const _size = mergeValues(size, textTheme.size, TextSize.body);

  return (
    <>
      <LazyCSS
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap"
        key="sourceCodeFont"
      />

      <Root _colorTheme={colorTheme} _color={_color} _size={_size} {...props} />
    </>
  );
}

const Root = styled.code<{
  _colorTheme: ColorTheme;
  _color: ThemedColor;
  _size: TextSize;
}>`
  line-height: 1.75;
  color: ${({ _colorTheme, _color }) => _colorTheme[_color]};
  font-family: "Source Code Pro", monospace;
  word-break: break-word;
  transition: font-size 150ms ease-in-out 0ms;

  ${({ _size }) => TEXT_SIZES[_size]}
`;

const TEXT_SIZES = {
  [TextSize.body]: `
    font-size: ${LAPTOP_TEXT_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_TEXT_SIZE}px;
    }
  `,
  [TextSize.caption]: `
    font-size: 17px;

    ${MOBILE} {
      font-size: 14px;
    }
  `,
  [TextSize.title]: `
    font-size: ${LAPTOP_TITLE_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_TITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle]: `
    font-size: ${LAPTOP_SUBTITLE_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle2]: `
    font-size: ${LAPTOP_SUBTITLE2_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE2_SIZE}px;
    }
  `,
  [TextSize.subtitle3]: `
    font-size: ${LAPTOP_SUBTITLE3_SIZE}px;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE3_SIZE}px;
    }
  `
};
