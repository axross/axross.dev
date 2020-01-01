import { createContext } from "react";
import ThemedColor from "../types/ThemedColor";
import { TextAlignment, TextType } from "./Text";

export { TextAlignment, TextType } from "./Text";

export interface TextTheme {
  color?: ThemedColor;
  type?: TextType;
  maxLines?: number;
  alignment?: TextAlignment;
  isLink?: boolean;
  isLinkHovered?: boolean;
}

export default createContext<TextTheme>({});
