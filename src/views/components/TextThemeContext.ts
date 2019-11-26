import { createContext } from "react";
import { TextAlignment, TextColor, TextSize } from "./Text";

export { TextAlignment, TextColor, TextSize } from "./Text";

export interface TextTheme {
  color?: TextColor;
  size?: TextSize;
  bold?: boolean;
  maxLines?: number;
  alignment?: TextAlignment;
  selectable?: boolean;
}

export default createContext<TextTheme>({});
