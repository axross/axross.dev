import * as React from "react";
import TextThemeContext from "../TextThemeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Strong({ children }: Props) {
  return (
    <TextThemeContext.Provider value={{ bold: true }}>
      {children}
    </TextThemeContext.Provider>
  );
}
