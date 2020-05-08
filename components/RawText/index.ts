export { default } from "./RawText";
export { default as RawTextThemeContext } from "./RawTextThemeContext";
export { default as TextAlignment } from "./TextAlignment";
export { default as TextColor } from "./TextColor";
export { default as TextLineSize } from "./TextLineSize";
export { default as TextSize } from "./TextSize";
export { default as Typeface } from "./Typeface";

// TODO:
// temporary implementation
// use `export type { ... } from "";` to export types when --isolatedModules is enabled
// but @babel/preset-typescript doesn't support this syntax yet
import { Props as _RawTextProps } from "./RawText";
export type RawTextProps = _RawTextProps;
import { RawTextTheme as _RawTextTheme } from "./RawTextThemeContext";
export type RawTextTheme = _RawTextTheme;
