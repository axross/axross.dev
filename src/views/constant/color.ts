export interface ThemedColor {
  light: string;
  dark: string;
}

export enum ForegroundColor {
  normal,
  highlight,
  primary,
  primaryHighlight,
  secondary,
  secondaryHighlight
}

export const FOREGROUND_COLORS = new Map<ForegroundColor, ThemedColor>([
  [
    ForegroundColor.normal,
    {
      light: "#2F4858",
      dark: "#e8e8c9"
    }
  ],
  [
    ForegroundColor.highlight,
    {
      light: "#1a304c",
      dark: "#F2FEDC"
    }
  ],
  [
    ForegroundColor.primary,
    {
      light: "#0078D3",
      dark: "#fe9583"
    }
  ],
  [
    ForegroundColor.primaryHighlight,
    {
      light: "#21AEFF",
      dark: "#f15f46"
    }
  ],
  [
    ForegroundColor.secondary,
    {
      light: "#9CADBC",
      dark: "#ACAC9A"
    }
  ],
  [
    ForegroundColor.secondaryHighlight,
    {
      light: "#9CADBC80",
      dark: "#C8C9A3"
    }
  ]
]);

export enum BackgroundColor {
  normal,
  highlight,
  code
}

export const BACKGROUND_COLORS = new Map<BackgroundColor, ThemedColor>([
  [
    BackgroundColor.normal,
    {
      light: "#fdfdfd",
      dark: "#1a304c"
    }
  ],
  [
    BackgroundColor.highlight,
    {
      light: "#F3F9FF",
      dark: "#2F4858"
    }
  ],
  [
    BackgroundColor.code,
    {
      light: "#FAFAFA",
      dark: "#282c34"
    }
  ]
]);

export enum CodeColor {
  normal,
  comment,
  punctuation,
  keyword,
  operator,
  function,
  string,
  number,
  class,
  tag,
  attributeKey,
  attributeValue,
  tagPunctuation,
  constant,
  parameter,
  property,
  selector,
  hexcode
}

export const CODE_COLORS = new Map<CodeColor, ThemedColor>([
  [
    CodeColor.normal,
    {
      light: "#e45649",
      dark: "#e06c75"
    }
  ],
  [
    CodeColor.comment,
    {
      light: "#A0A1A7",
      dark: "#5c6370"
    }
  ],
  [
    CodeColor.punctuation,
    {
      light: "#383A42",
      dark: "#abb2bf"
    }
  ],
  [
    CodeColor.keyword,
    {
      light: "#A626A4",
      dark: "#c678dd"
    }
  ],
  [
    CodeColor.operator,
    {
      light: "#0184BC",
      dark: "#56b6c2"
    }
  ],
  [
    CodeColor.function,
    {
      light: "#4078F2",
      dark: "#56b6c2"
    }
  ],
  [
    CodeColor.string,
    {
      light: "#50A14F",
      dark: "#98c379"
    }
  ],
  [
    CodeColor.number,
    {
      light: "#986801",
      dark: "#d19a66"
    }
  ],
  [
    CodeColor.class,
    {
      light: "#c18401",
      dark: "#e5c07b"
    }
  ],
  [
    CodeColor.tag,
    {
      light: "#e45649",
      dark: "#f07178"
    }
  ],
  [
    CodeColor.attributeKey,
    {
      light: "#4078f2",
      dark: "#c792ea"
    }
  ],
  [
    CodeColor.attributeValue,
    {
      light: "#50a14f",
      dark: "#61afef"
    }
  ],
  [
    CodeColor.tagPunctuation,
    {
      light: "#383a42",
      dark: "#abb2bf"
    }
  ],
  [
    CodeColor.constant,
    {
      light: "#986801",
      dark: "#d19a66"
    }
  ],
  [
    CodeColor.property,
    {
      light: "#383a42",
      dark: "#abb2bf"
    }
  ],
  [
    CodeColor.parameter,
    {
      light: "#383A42",
      dark: "#abb2bf"
    }
  ],
  [
    CodeColor.selector,
    {
      light: "#e45649",
      dark: "#e06c75"
    }
  ],
  [
    CodeColor.hexcode,
    {
      light: "#4078F2",
      dark: "#56b6c2"
    }
  ]
]);
