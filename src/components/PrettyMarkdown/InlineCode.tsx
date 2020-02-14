import * as React from "react";
import RawText, { RawTextThemeContext, Typeface } from "../RawText";

interface Props {
  children?: string;
}

export default function CodeText({ children }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <RawTextThemeContext.Provider value={{ ...theme, typeface: Typeface.monospace }}>
      {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
    </RawTextThemeContext.Provider>
  );
}
