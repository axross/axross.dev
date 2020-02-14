import { createContext } from "react";
import ThemedColor from "../../types/ThemedColor";
import TextAlignment from "./TextAlignment";
import TextLineSize from "./TextLineSize";
import TextSize from "./TextSize";
import Typeface from "./Typeface";

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
}

export default createContext<RawTextTheme>({});
