import * as React from "react";
import RawText from "../RawText";
import RawTextThemeContext from "../RawTextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Emphasis({ children }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <RawTextThemeContext.Provider value={{ ...theme, italic: true }}>
      {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
    </RawTextThemeContext.Provider>
  );
}
