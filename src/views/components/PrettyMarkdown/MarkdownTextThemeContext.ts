import { createContext } from "react";
import ThemedColor from "../../types/ThemedColor";
import { TextType } from "./MarkdownText";

export { TextType } from "./MarkdownText";

export interface MarkdownTextTheme {
  color?: ThemedColor;
  type?: TextType;
  isStrong?: boolean;
  isEmphasized?: boolean;
  isDeleted?: boolean;
  isCode?: boolean;
  isLink?: boolean;
  isLinkHovered?: boolean;
}

export default createContext<MarkdownTextTheme>({});
