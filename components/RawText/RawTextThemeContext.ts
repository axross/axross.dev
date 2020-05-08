import { createContext } from "react";
import TextAlignment from "./TextAlignment";
import TextColor from "./TextColor";
import TextLineSize from "./TextLineSize";
import TextSize from "./TextSize";
import Typeface from "./Typeface";

export interface RawTextTheme {
  color?: TextColor;
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
