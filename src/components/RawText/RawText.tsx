import { css, SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import {
  // DARK_ACCENT_BACKGROUND_COLOR,
  DARK_ACCENT_FOREGROUND_COLOR,
  // DARK_BACKGROUND_COLOR,
  DARK_EMPHASIZED_FOREGROUND_COLOR,
  DARK_FOREGROUND_COLOR,
  // DARK_LOADER_COLOR,
  // DARK_LOADER_HIGHLIGHT_COLOR,
  DARK_PRIMARY_FOREGROUND_COLOR,
  // DARK_SECONDARY_BACKGROUND_COLOR,
  DARK_SECONDARY_FOREGROUND_COLOR,
  DARK_WHITE_FOREGROUND_COLOR,
  // LIGHT_ACCENT_BACKGROUND_COLOR,
  LIGHT_ACCENT_FOREGROUND_COLOR,
  // LIGHT_BACKGROUND_COLOR,
  LIGHT_EMPHASIZED_FOREGROUND_COLOR,
  LIGHT_FOREGROUND_COLOR,
  // LIGHT_LOADER_COLOR,
  // LIGHT_LOADER_HIGHLIGHT_COLOR,
  LIGHT_PRIMARY_FOREGROUND_COLOR,
  // LIGHT_SECONDARY_BACKGROUND_COLOR,
  LIGHT_SECONDARY_FOREGROUND_COLOR,
  LIGHT_WHITE_FOREGROUND_COLOR
} from "../../constant/color";
import { DARK_MODE, MOBILE } from "../../constant/mediaQuery";
import LazyCSS from "../LazyCSS";
import RawTextThemeContext from "./RawTextThemeContext";
import TextAlignment from "./TextAlignment";
import TextColor from "./TextColor";
import TextLineSize from "./TextLineSize";
import TextSize from "./TextSize";
import Typeface from "./Typeface";

export interface Props extends React.Attributes {
  color?: TextColor;
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

/**
 * A fundamental text component. Every text in this repository should be made of this component.
 */
export default function RawText({ color,
  typeface, size, lineSize, alignment, maxLines, bold, italic, underline, lineThrough, ...props }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};
  const _color = color ?? theme.color ?? TextColor.foreground;
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
        _color={_color}
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

const COLOR_CSS: Record<TextColor, SerializedStyles> = {
  [TextColor.foreground]: css`
    color: ${LIGHT_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_FOREGROUND_COLOR};
    }
  `,
  [TextColor.emphasizedForeground]: css`
    color: ${LIGHT_EMPHASIZED_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_EMPHASIZED_FOREGROUND_COLOR};
    }
  `,
  [TextColor.secondaryForeground]: css`
    color: ${LIGHT_SECONDARY_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_SECONDARY_FOREGROUND_COLOR};
    }
  `,
  [TextColor.primaryForeground]: css`
    color: ${LIGHT_PRIMARY_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_PRIMARY_FOREGROUND_COLOR};
    }
  `,
  [TextColor.accentForeground]: css`
    color: ${LIGHT_ACCENT_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_ACCENT_FOREGROUND_COLOR};
    }
  `,
  [TextColor.whiteForeground]: css`
    color: ${LIGHT_WHITE_FOREGROUND_COLOR};

    ${DARK_MODE} {
      color: ${DARK_WHITE_FOREGROUND_COLOR};
    }
  `,
  // [TextColor.background]: css`
  //   color: ${LIGHT_BACKGROUND_COLOR};

  //   ${DARK_MODE} {
  //     color: ${DARK_BACKGROUND_COLOR};
  //   }
  // `,
  // [TextColor.secondaryBackground]: css`
  //   color: ${LIGHT_SECONDARY_BACKGROUND_COLOR};

  //   ${DARK_MODE} {
  //     color: ${DARK_SECONDARY_BACKGROUND_COLOR};
  //   }
  // `,
  // [TextColor.accentBackground]: css`
  //   color: ${LIGHT_ACCENT_BACKGROUND_COLOR};

  //   ${DARK_MODE} {
  //     color: ${DARK_ACCENT_BACKGROUND_COLOR};
  //   }
  // `,
  // [TextColor.loader]: css`
  //   color: ${LIGHT_LOADER_COLOR};

  //   ${DARK_MODE} {
  //     color: ${DARK_LOADER_COLOR};
  //   }
  // `,
  // [TextColor.loaderHighlight]: css`
  //   color: ${LIGHT_LOADER_HIGHLIGHT_COLOR};

  //   ${DARK_MODE} {
  //     color: ${DARK_LOADER_HIGHLIGHT_COLOR};
  //   }
  // `,
};

const TYPEFACE_CSS: Record<Typeface, SerializedStyles> = {
  [Typeface.headline]: css`font-family: "Montserrat", sans-serif;`,
  [Typeface.body]: css`font-family: "Open Sans", sans-serif;`,
  [Typeface.monospace]: css`font-family: "Source Code Pro", monospace;`,
};

const TEXT_SIZE_CSS: Record<TextSize, SerializedStyles> = {
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
};

const TEXT_LINE_SIZE_CSS: Record<TextLineSize, SerializedStyles> = {
  [TextLineSize.default]: css`line-height: 1.5;`,
  [TextLineSize.large]: css`line-height: 1.75`,
};

const TEXT_ALIGNMENT_CSS: Record<TextAlignment, SerializedStyles> = {
  [TextAlignment.default]: css`text-align: inherit;`,
  [TextAlignment.start]: css`text-align: start`,
  [TextAlignment.end]: css`text-align: end`,
  [TextAlignment.center]: css`text-align: center`,
};

const Root = styled.span<{
  _color: TextColor;
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
  ${({ _color }) => COLOR_CSS[_color]}
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
`;
