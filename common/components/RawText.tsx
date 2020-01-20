import * as React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { MOBILE, DARK_MODE } from "../constant/mediaQuery";
import { LIGHT_COLOR, DARK_COLOR } from "../constant/color";
import ThemedColor from "../types/ThemedColor";
import LazyCSS from "./LazyCSS";
import RawTextThemeContext from "./RawTextThemeContext";

export { default as ThemedColor } from "../types/ThemedColor";

export interface Props extends React.Attributes {
  color?: ThemedColor;
  typeface?: Typeface;
  size?: TextSize;
  lineSize?: TextLineSize;
  alignment?: TextAlignment;
  /**
   * If this param is more than or equal 1 and the string inside is going overflown, it is clamped by an ellipsis at the end of the specified line.
   */
  maxLines?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  className?: string;
  children?: string;
}

export enum Typeface {
  body,
  headline,
  monospace,
}

export enum TextSize {
  giantic,
  huge,
  large,
  larger,
  default,
  small,
}

export enum TextLineSize {
  default,
  large
}

export enum TextAlignment {
  default = "inherit",
  start = "start",
  end = "end",
  center = "center"
}

/**
 * A fundamental text component. Every text in this repository should be made of this component.
 */
export default function RawText({ color, typeface, size, lineSize, alignment, maxLines, bold, italic, underline, lineThrough, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  const _color = color ?? theme.color ?? ThemedColor.foreground;
  const _typeface = typeface ?? theme.typeface ?? Typeface.body;
  const _size = size ?? theme.size ?? TextSize.default;
  const _lineSize = lineSize ?? theme.lineSize ?? TextLineSize.default;
  const _alignment = alignment ?? theme.alignment ?? TextAlignment.default;
  const _maxLines = maxLines ?? theme.maxLines ?? 0;
  const _bold = bold ?? theme.bold ?? false;
  const _italic = italic ?? theme.italic ?? false;
  const _underline = underline ?? theme.underline ?? false;
  const _lineThrough = lineThrough ?? theme.lineThrough ?? false;

  return (
    <>
      <LazyCSS
        href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,600i|Open+Sans:400,400i,700,700i|Source+Code+Pro:400,400i,600,600i,700,700i&display=swap"
        key="sansSerifFont"
      />

      <Root
        themedColor={_color}
        typeface={_typeface}
        size={_size}
        lineSize={_lineSize}
        alignment={_alignment}
        maxLines={_maxLines}
        bold={_bold}
        italic={_italic}
        underline={_underline}
        lineThrough={_lineThrough}
        {...props}
      />
    </>
  );
}

const TYPEFACE_CSS: Record<Typeface, FlattenSimpleInterpolation> = {
  [Typeface.headline]: css`font-family: "Montserrat", sans-serif;`,
  [Typeface.body]: css`font-family: "Open Sans", sans-serif;`,
  [Typeface.monospace]: css`font-family: "Source Code Pro", monospace;`,
}

const TEXT_SIZE_CSS: Record<TextSize, FlattenSimpleInterpolation> = {
  [TextSize.giantic]: css`
    font-size: 46px;

    ${MOBILE} {
      font-size: 36px;
    }
  `,
  [TextSize.huge]: css`
    font-size: 40px;

    ${MOBILE} {
      font-size: 30px;
    }
  `,
  [TextSize.large]: css`
    font-size: 32px;

    ${MOBILE} {
      font-size: 24px;
    }
  `,
  [TextSize.larger]: css`
    font-size: 24px;

    ${MOBILE} {
      font-size: 20px;
    }
  `,
  [TextSize.default]: css`
    font-size: 20px;

    ${MOBILE} {
      font-size: 16px;
    }
  `,
  [TextSize.small]: css`
    font-size: 16px;

    ${MOBILE} {
      font-size: 12px;
    }
  `,
}

const TEXT_LINE_SIZE_CSS: Record<TextLineSize, FlattenSimpleInterpolation> = {
  [TextLineSize.default]: css`line-height: 1.5;`,
  [TextLineSize.large]: css`line-height: 1.75`,
}

const TEXT_ALIGNMENT_CSS: Record<TextAlignment, FlattenSimpleInterpolation> = {
  [TextAlignment.default]: css`text-align: inherit;`,
  [TextAlignment.start]: css`text-align: start`,
  [TextAlignment.end]: css`text-align: end`,
  [TextAlignment.center]: css`text-align: center`,
}

const Root = styled.span<{
  themedColor: ThemedColor;
  typeface: Typeface;
  size: TextSize;
  lineSize: TextLineSize;
  alignment: TextAlignment;
  maxLines: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
}>`
  color: ${({ themedColor }) => LIGHT_COLOR[themedColor]};
  ${({ typeface }) => TYPEFACE_CSS[typeface]}
  ${({ size }) => TEXT_SIZE_CSS[size]}
  ${({ lineSize }) => TEXT_LINE_SIZE_CSS[lineSize]}
  ${({ alignment }) => TEXT_ALIGNMENT_CSS[alignment]}
  font-weight: ${({ bold }) => bold ? 600 : 400};
  font-style: ${({ italic }) => italic ? "italic" : "normal"};
  text-decoration: ${({ underline, lineThrough }) => {
    let decoration = "";

    if (lineThrough) {
      decoration += "line-through";
    }

    if (underline) {
      decoration += " underline";
    }

    return decoration === "" ? "none" : decoration;
  }};
  word-break: break-word;

  ${({ maxLines }) =>
    maxLines === 0
      ? ""
      : `
          display: box;
          display: -webkit-box;
          display: -moz-box;
          box-orient: vertical;
          box-orient: vertical;
          -webkit-box-orient: vertical;
          -moz-box-orient: vertical;
          line-clamp: ${maxLines};
          -webkit-line-clamp: ${maxLines};
          overflow-y: hidden;
        `
  }

  ${DARK_MODE} {
    color: ${({ themedColor }) => DARK_COLOR[themedColor]};
  }
`;
