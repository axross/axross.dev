import { createContext } from "react";
import ThemedColor from "../types/ThemedColor";
import { TextAlignment, TextLineSize, TextSize, Typeface } from "./RawText";

export { default as ThemedColor } from "../types/ThemedColor";
export { TextAlignment, TextLineSize, TextSize, Typeface } from "./RawText";

export interface RawTextTheme {
  color?: ThemedColor;
  typeface?: Typeface;
  size?: TextSize;
  lineSize?: TextLineSize;
  alignment?: TextAlignment;
  maxLines?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  className?: string;
  children?: string;
}

export default createContext<RawTextTheme>({});
