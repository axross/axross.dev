import styled from "@emotion/styled";
import * as React from "react";
import TextThemeContext, { TextTheme } from "./TextThemeContext";
import { FOREGROUND_COLORS, ForegroundColor } from "../constant/color";
import { DARK_MODE, MOBILE } from "../constant/mediaquery";
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
} from "../constant/size";
import mergeValues from "../utility/mergeValues";
import LazyCSS from "./LazyCSS";

export { ForegroundColor as TextColor } from "../constant/color";

export interface Props extends React.Attributes {
  /**
   * You can use [[TextColor]] enum instead of a raw string value
   */
  color?: ForegroundColor;
  /**
   * You can use [[TextSize]] enum instead of a raw string value
   */
  size?: TextSize;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  /**
   * If this param is more than or equal 1 and the string inside is going overflown, it is clamped by an ellipsis at the end of the specified line.
   */
  maxLines?: number;
  alignment?: TextAlignment;
  /**
   * You should set it to be `true` if it's used as a label text, such as labels on buttons.
   */
  selectable?: boolean;
  className?: string;
  children?: string;
}

/**
 * A fundamental text component. Every text in this repository should be made of this component.
 */
export default React.forwardRef<HTMLElement, Props>(
  (
    {
      color,
      size,
      bold,
      italic,
      underline,
      strikeThrough,
      maxLines,
      alignment,
      selectable,
      ...props
    },
    ref
  ) => {
    const textTheme: TextTheme = React.useContext(TextThemeContext) || {};
    const _color = mergeValues(color, textTheme.color, ForegroundColor.normal);
    const _size = mergeValues(size, textTheme.size, TextSize.body);
    const _bold = mergeValues(bold, textTheme.bold, false);
    const _italic = mergeValues(italic, textTheme.italic, false);
    const _underline = mergeValues(underline, textTheme.underline, false);
    const _strikeThrough = mergeValues(
      strikeThrough,
      textTheme.strikeThrough,
      false
    );
    const _maxLines = mergeValues(maxLines, textTheme.maxLines, 0);
    const _alignment = mergeValues(
      alignment,
      textTheme.alignment,
      TextAlignment.default
    );
    const _selectable = mergeValues(selectable, textTheme.selectable, true);

    return (
      <>
        <LazyCSS
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&display=swap"
          key="sansSerifFont"
        />

        <Root
          _color={_color}
          _size={_size}
          _bold={_bold}
          _italic={_italic}
          _underline={_underline}
          _strikeThrough={_strikeThrough}
          _maxLines={_maxLines}
          _alignment={_alignment}
          _selectable={_selectable}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

export enum TextSize {
  body,
  caption,
  title,
  subtitle,
  subtitle2,
  subtitle3
}

export enum TextAlignment {
  default = "inherit",
  start = "start",
  end = "end",
  center = "center"
}

const Root = styled.span<{
  _size: TextSize;
  _color: ForegroundColor;
  _bold: boolean;
  _italic: boolean;
  _underline: boolean;
  _strikeThrough: boolean;
  _maxLines: number;
  _alignment: TextAlignment;
  _selectable: boolean;
}>`
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  color: ${({ _color }) => FOREGROUND_COLORS.get(_color)!.light};
  font-family: "Open Sans", sans-serif;
  font-weight: ${({ _bold }) => (_bold ? "bold" : "normal")};
  font-style: ${({ _italic }) => (_italic ? "italic" : "normal")};
  text-align: ${({ _alignment }) => _alignment};
  text-decoration: ${({ _underline, _strikeThrough }) =>
    _underline || _strikeThrough
      ? `${_underline ? "underline" : ""} ${
          _strikeThrough ? "line-through" : ""
        }`
      : "none"};
  word-break: break-word;
  user-select: ${({ _selectable }) => (_selectable ? "auto" : "none")};
  transition: color 150ms ease-in-out 0ms, font-size 150ms ease-in-out 0ms,
    font-weight 150ms ease-in-out 0ms, text-decoration 150ms ease-in-out 0ms;

  ${({ _size }) => TEXT_SIZES[_size]}

  ${({ _maxLines }) =>
    _maxLines === 0
      ? ""
      : `
    display: box;
    display: -webkit-box;
    display: -moz-box;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    line-clamp: ${_maxLines};
    -webkit-line-clamp: ${_maxLines};
    overflow-y: hidden;
  `}

  ${DARK_MODE} {
    color: ${({ _color }) => FOREGROUND_COLORS.get(_color)!.dark};
  }
`;

const TEXT_SIZES = {
  [TextSize.body]: `
    font-size: ${LAPTOP_TEXT_SIZE}px;
    line-height: 1.75;

    ${MOBILE} {
      font-size: ${MOBILE_TEXT_SIZE}px;
    }
  `,
  [TextSize.caption]: `
    font-size: 17px;
    line-height: 1.75;

    ${MOBILE} {
      font-size: 14px;
    }
  `,
  [TextSize.title]: `
    font-size: ${LAPTOP_TITLE_SIZE}px;
    line-height: 1.5;

    ${MOBILE} {
      font-size: ${MOBILE_TITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle]: `
    font-size: ${LAPTOP_SUBTITLE_SIZE}px;
    line-height: 1.5;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle2]: `
    font-size: ${LAPTOP_SUBTITLE2_SIZE}px;
    line-height: 1.5;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE2_SIZE}px;
    }
  `,
  [TextSize.subtitle3]: `
    font-size: ${LAPTOP_SUBTITLE3_SIZE}px;
    line-height: 1.5;

    ${MOBILE} {
      font-size: ${MOBILE_SUBTITLE3_SIZE}px;
    }
  `
};
