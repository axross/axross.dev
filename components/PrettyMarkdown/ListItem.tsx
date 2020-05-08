import * as React from "react";
import RawText from "../RawText";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function ListItem({ children, ...props }: Props) {
  return (
    <li {...props}>
      {React.Children.map(children, (child) =>
        typeof child === "string" ? <RawText>{child}</RawText> : child
      )}
    </li>
  );
}
