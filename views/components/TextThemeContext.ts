import { createContext } from "react";
import { TextAlignment, TextSize } from "./Text";

export { TextAlignment, TextColor, TextSize } from "./Text";

export interface TextTheme {
  color?: string;
  size?: TextSize;
  bold?: boolean;
  multiline?: boolean;
  alignment?: TextAlignment;
  selectable?: boolean;
}

const TextThemeContext = createContext<TextTheme>({});

export default TextThemeContext;
