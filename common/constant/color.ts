import ThemedColor from "../types/ThemedColor";

type ColorTheme = Record<ThemedColor, string>;

export const LIGHT_COLOR: ColorTheme = {
  [ThemedColor.foreground]: "#222f3e",
  [ThemedColor.emphasizedForeground]: "#11181f",
  [ThemedColor.secondaryForeground]: "#8395a7",
  [ThemedColor.primaryForeground]: "#2e86de",
  [ThemedColor.accentForeground]: "#ff9f43",
  [ThemedColor.whiteForeground]: "#ffffff",
  [ThemedColor.background]: "#ffffff",
  [ThemedColor.accentBackground]: "#FFF2D5",
  [ThemedColor.loader]: "#E0E4E9",
  [ThemedColor.loaderHighlight]: "#EFF2F4"
};

export const DARK_COLOR: ColorTheme = {
  [ThemedColor.foreground]: "#eee7e0",
  [ThemedColor.emphasizedForeground]: "#ffffff",
  [ThemedColor.secondaryForeground]: "#8395a7",
  [ThemedColor.primaryForeground]: "#54a0ff",
  [ThemedColor.accentForeground]: "#feca57",
  [ThemedColor.whiteForeground]: "#ffffff",
  [ThemedColor.background]: "#11181f",
  [ThemedColor.accentBackground]: "#4C442D",
  [ThemedColor.loader]: "#1E2730",
  [ThemedColor.loaderHighlight]: "#2D3641"
};

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

export const CODE_BACKGROUND_COLOR = "#222f3e";

export const CODE_COLORS: Record<CodeColor, string> = {
  [CodeColor.normal]: "#e06c75",
  [CodeColor.comment]: "#5c6370",
  [CodeColor.punctuation]: "#abb2bf",
  [CodeColor.keyword]: "#c678dd",
  [CodeColor.operator]: "#56b6c2",
  [CodeColor.function]: "#56b6c2",
  [CodeColor.string]: "#98c379",
  [CodeColor.number]: "#d19a66",
  [CodeColor.class]: "#e5c07b",
  [CodeColor.tag]: "#f07178",
  [CodeColor.attributeKey]: "#c792ea",
  [CodeColor.attributeValue]: "#61afef",
  [CodeColor.tagPunctuation]: "#abb2bf",
  [CodeColor.constant]: "#d19a66",
  [CodeColor.property]: "#abb2bf",
  [CodeColor.parameter]: "#abb2bf",
  [CodeColor.selector]: "#e06c75",
  [CodeColor.hexcode]: "#56b6c2"
};
