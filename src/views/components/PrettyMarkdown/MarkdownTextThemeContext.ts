import { createContext } from "react";
import { ThemedColor } from "../../../entities/ColorTheme";
import { TextType } from "./MarkdownText";

export { TextType } from "./MarkdownText";

export interface MarkdownTextTheme {
  color?: ThemedColor;
  type?: TextType;
  isStrong?: boolean;
  isEmphasized?: boolean;
  isDeleted?: boolean;
  isCode?: boolean;
}

export default createContext<MarkdownTextTheme>({});
