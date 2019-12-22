import Color from "./Color";

type ColorTheme = Record<ThemedColor, Color>;

export default ColorTheme;

export enum ThemedColor {
  foreground,
  emphasizedForeground,
  secondaryForeground,
  primaryForeground,
  accentForeground,
  whiteForeground,
  background,
  accentBackground
}
