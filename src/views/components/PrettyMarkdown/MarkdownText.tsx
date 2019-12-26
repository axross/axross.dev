import { css, SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import LazyCSS from "../LazyCSS";
import MarkdownTextThemeContext, {
  MarkdownTextTheme
} from "./MarkdownTextThemeContext";
import { MOBILE, DARK_MODE } from "../../constant/mediaQuery";
import { LIGHT_COLOR, DARK_COLOR } from "../../constant/color";
import ThemedColor from "../../types/ThemedColor";

export interface Props extends React.Attributes {
  className?: string;
  children?: string;
}

/**
 * A fundamental text component. Every text in this repository should be made of this component.
 */
export default function MarkdownText({ ...props }) {
  const theme: MarkdownTextTheme =
    React.useContext(MarkdownTextThemeContext) || {};
  const isLink = theme.isLink ?? false;
  const isLinkHovered = theme.isLinkHovered ?? false;
  const color = theme.color ?? (isLink ? ThemedColor.primaryForeground : ThemedColor.foreground);
  const type = theme.type ?? TextType.paragraph;
  const isStrong = theme.isStrong ?? false;
  const isEmphasized = theme.isEmphasized ?? false;
  const isDeleted = theme.isDeleted ?? false;
  const isCode = theme.isCode ?? false;

  return (
    <>
      {isCode ? (
        <LazyCSS
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500&display=swap"
          key="sourceCodeFont"
        />
      ) : (
        <LazyCSS
          href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,600,600i|Open+Sans:400,400i,700,700i&&display=swap"
          key="sansSerifFont"
        />
      )}

      <Root
        _color={color}
        _type={type}
        _strong={isStrong}
        _emphasized={isEmphasized}
        _deleted={isDeleted}
        _code={isCode}
        _link={isLink}
        _linkHovered={isLinkHovered}
        {...props}
      />
    </>
  );
}

export enum TextType {
  paragraph,
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6
}

const Root = styled.span<{
  _color: ThemedColor;
  _type: TextType;
  _strong: boolean;
  _emphasized: boolean;
  _deleted: boolean;
  _code: boolean;
  _link: boolean;
  _linkHovered: boolean;
}>`
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  color: ${({ _color }) => LIGHT_COLOR[_color]};
  font-weight: ${({ _strong }) => (_strong ? "bold" : "regular")};
  font-style: ${({ _emphasized }) => (_emphasized ? "italic" : "normal")};
  text-decoration: ${({ _deleted, _link, _linkHovered }) => {
    let decoration = "";

    if (_deleted) {
      decoration += "line-through";
    }

    if (_link && _linkHovered) {
      decoration += " underline";
    }

    return decoration === "" ? "none" : decoration;
  }};
  word-break: break-word;
  transition: color 150ms ease-in-out 0ms, font-size 150ms ease-in-out 0ms,
    font-weight 150ms ease-in-out 0ms, text-decoration 150ms ease-in-out 0ms;

  ${({ _type }) => TEXT_STYLE[_type]}

  ${({ _code }) => _code ? 'font-family: "Source Code Pro", monospace;' : ""}

  ${DARK_MODE} {
    color: ${({ _color }) => DARK_COLOR[_color]};
  }
`;

const TEXT_STYLE: Record<TextType, SerializedStyles> = {
  [TextType.paragraph]: css`
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.75;

    ${MOBILE} {
      font-size: 16px;
    }
  `,
  [TextType.heading1]: css`
    font-size: 46px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 36px;
    }
  `,
  [TextType.heading2]: css`
    font-size: 40px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 30px;
    }
  `,
  [TextType.heading3]: css`
    font-size: 30px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 24px;
    }
  `,
  [TextType.heading4]: css`
    font-size: 24px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 20px;
    }
  `,
  [TextType.heading5]: css`
    font-size: 24px;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 20px;
    }
  `,
  [TextType.heading6]: css`
    font-size: 20px;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;

    ${MOBILE} {
      font-size: 16px;
    }
  `
};
