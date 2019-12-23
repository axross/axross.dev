import { createContext } from "react";
import { ThemedColor } from "../../entities/ColorTheme";
import { TextAlignment, TextSize } from "./Text";

export { TextAlignment, TextSize } from "./Text";

export interface TextTheme {
  color?: ThemedColor;
  size?: TextSize;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  maxLines?: number;
  alignment?: TextAlignment;
  selectable?: boolean;
}

export default createContext<TextTheme>({});
