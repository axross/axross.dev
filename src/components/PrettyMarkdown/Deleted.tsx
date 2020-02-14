import * as React from "react";
import RawText, { RawTextThemeContext } from "../RawText";

interface Props extends React.Attributes {
  className?: string;
  children: React.ReactNode;
}

export default function Deleted({ children }: Props) {
  const theme = React.useContext(RawTextThemeContext) ?? {};

  return (
    <RawTextThemeContext.Provider value={{ ...theme, lineThrough: true }}>
      {React.Children.map(children, child => typeof child === "string" ? <RawText>{child}</RawText> : child)}
    </RawTextThemeContext.Provider>
  );
}
