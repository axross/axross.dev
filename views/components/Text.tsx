import styled from "@emotion/styled";
import Head from "next/head";
import * as React from "react";
import TextThemeContext, { TextTheme } from "./TextThemeContext";
import { MEDIA_MOBILE } from "../constant/mediaquery";
import {
  LAPTOP_SUBTITLE_SIZE,
  LAPTOP_SUBTITLE2_SIZE,
  LAPTOP_TEXT_SIZE,
  LAPTOP_TITLE_SIZE,
  MOBILE_SUBTITLE_SIZE,
  MOBILE_SUBTITLE2_SIZE,
  MOBILE_TEXT_SIZE,
  MOBILE_TITLE_SIZE
} from "../constant/size";
import mergeValues from "../utility/mergeValues";

export interface Props extends React.Attributes {
  /**
   * Default is `span`. No matter if `h1` or `p`, it affects as just a kind of element.
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * You can use [[TextColor]] enum instead of a raw string value
   */
  color?: string;
  /**
   * You can use [[TextSize]] enum instead of a raw string value
   */
  size?: TextSize;
  bold?: boolean;
  /**
   * If this param is true and the string inside is going overflown, it is clamped by an ellipsis.
   */
  multiline?: boolean;
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
const Text = React.forwardRef<HTMLElement, Props>(
  (
    {
      tag = "span",
      color,
      size,
      bold,
      multiline,
      alignment,
      selectable,
      ...props
    },
    ref
  ) => {
    const Component = Root.withComponent(tag);
    const textTheme: TextTheme = React.useContext(TextThemeContext) || {};
    const _color = mergeValues(color, textTheme.color, TextColor.normal);
    const _size = mergeValues(size, textTheme.size, TextSize.body);
    const _bold = mergeValues(bold, textTheme.bold, false);
    const _multiline = mergeValues(multiline, textTheme.multiline, false);
    const _alignment = mergeValues(
      alignment,
      textTheme.alignment,
      TextAlignment.default
    );
    const _selectable = mergeValues(selectable, textTheme.selectable, true);

    return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700|Open+Sans:400,700&display=swap&subset=japanese"
            rel="stylesheet"
            key="sansFont"
          />
        </Head>

        <Component
          _color={_color}
          _size={_size}
          _bold={_bold}
          _multiline={_multiline}
          _alignment={_alignment}
          _selectable={_selectable}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

export enum TextColor {
  normal = "#0a4c5b",
  black = "#0a3640",
  primary = "#087da1",
  primaryHighlight = "#1c7f99",
  secondary = "#667985",
  secondaryHighlight = "#bdd3de"
}

export enum TextSize {
  body,
  caption,
  title,
  subtitle,
  subtitle2
}

export enum TextAlignment {
  default = "inherit",
  start = "start",
  end = "end",
  center = "center"
}

const Root = styled.span<{
  _size: TextSize;
  _color: string;
  _bold: boolean;
  _multiline: boolean;
  _alignment: TextAlignment;
  _selectable: boolean;
}>`
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  color: ${({ _color }) => _color};
  font-family: "Open Sans", "Noto Sans JP";
  font-weight: ${({ _bold }) => (_bold ? "bold" : "normal")};
  text-align: ${({ _alignment }) => _alignment};
  line-height: ${({ _multiline }) => (_multiline ? "normal" : "1")};
  word-break: break-word;
  user-select: ${({ _selectable }) => (_selectable ? "auto" : "none")};
  transition: color 150ms ease-in-out 0ms, font-size 150ms ease-in-out 0ms,
    font-weight 150ms ease-in-out 0ms;

  ${({ _size }) => TEXT_SIZES[_size]}

  ${({ _multiline }) =>
    _multiline
      ? ""
      : `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `}
`;

const TEXT_SIZES = {
  [TextSize.body]: `
    font-size: ${LAPTOP_TEXT_SIZE}px;

    ${MEDIA_MOBILE} {
      font-size: ${MOBILE_TEXT_SIZE}px;
    }
  `,
  [TextSize.caption]: `
    font-size: 17px;

    ${MEDIA_MOBILE} {
      font-size: 14px;
    }
  `,
  [TextSize.title]: `
    font-size: ${LAPTOP_TITLE_SIZE}px;

    ${MEDIA_MOBILE} {
      font-size: ${MOBILE_TITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle]: `
    font-size: ${LAPTOP_SUBTITLE_SIZE}px;

    ${MEDIA_MOBILE} {
      font-size: ${MOBILE_SUBTITLE_SIZE}px;
    }
  `,
  [TextSize.subtitle2]: `
    font-size: ${LAPTOP_SUBTITLE2_SIZE}px;

    ${MEDIA_MOBILE} {
      font-size: ${MOBILE_SUBTITLE2_SIZE}px;
    }
  `
};

export default Text;
