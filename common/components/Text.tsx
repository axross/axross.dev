import { css, SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE, DARK_MODE } from "../constant/mediaQuery";
import { LIGHT_COLOR, DARK_COLOR } from "../constant/color";
import ThemedColor from "../types/ThemedColor";
import LazyCSS from "./LazyCSS";
import TextThemeContext, { TextTheme } from "./TextThemeContext";

export interface Props extends React.Attributes {
  color?: ThemedColor;
  type?: TextType;
  /**
   * If this param is more than or equal 1 and the string inside is going overflown, it is clamped by an ellipsis at the end of the specified line.
   */
  maxLines?: number;
  alignment?: TextAlignment;
  className?: string;
  children?: string;
}

/**
 * A fundamental text component. Every text in this repository should be made of this component.
 */
export default React.forwardRef<HTMLElement, Props>(
  ({ color, type, maxLines, alignment, ...props }, ref) => {
    const theme: TextTheme = React.useContext(TextThemeContext) || {};
    const isLink = theme.isLink ?? false;
    const isLinkHovered = theme.isLinkHovered ?? false;
    const _color =
      color ??
      theme.color ??
      (isLink ? ThemedColor.primaryForeground : ThemedColor.foreground);
    const _type = type ?? theme.type ?? TextType.body;
    const _maxLines = maxLines ?? theme.maxLines ?? 0;
    const _alignment = alignment ?? theme.alignment ?? TextAlignment.default;

    return (
      <>
        <LazyCSS
          href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,600i|Open+Sans:400,400i,700,700i&display=swap"
          key="sansSerifFont"
        />

        <Root
          _color={_color}
          _type={_type}
          _maxLines={_maxLines}
          _alignment={_alignment}
          _link={isLink}
          _linkHovered={isLinkHovered}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

export enum TextType {
  body,
  subtitle,
  label,
  logo
}

export enum TextAlignment {
  default = "inherit",
  start = "start",
  end = "end",
  center = "center"
}

const Root = styled.span<{
  _color: ThemedColor;
  _type: TextType;
  _maxLines: number;
  _alignment: TextAlignment;
  _link: boolean;
  _linkHovered: boolean;
}>`
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  color: ${({ _color }) => LIGHT_COLOR[_color]};
  text-align: ${({ _alignment }) => _alignment};
  text-decoration: ${({ _link, _linkHovered }) =>
    _link && _linkHovered ? "underline" : "none"};
  word-break: break-word;
  transition: color 150ms ease-in-out 0ms, font-size 150ms ease-in-out 0ms,
    font-weight 150ms ease-in-out 0ms, text-decoration 150ms ease-in-out 0ms;

  ${({ _type }) => TEXT_STYLE[_type]}

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
    color: ${({ _color }) => DARK_COLOR[_color]};
  }
`;

const TEXT_STYLE: Record<TextType, SerializedStyles> = {
  [TextType.body]: css`
    font-size: 20px;
    font-family: "Open Sans", sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 16px;
    }
  `,
  [TextType.subtitle]: css`
    font-size: 46px;
    font-weight: 600;
    font-family: "Montserrat", sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 32px;
    }
  `,
  [TextType.label]: css`
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 12px;
    }
  `,
  [TextType.logo]: css`
    font-size: 30px;
    font-weight: 600;
    font-family: "Montserrat", sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 22px;
    }
  `
};
