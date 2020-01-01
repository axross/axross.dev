import * as React from "react";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";

interface Props extends React.Attributes {
  ordered: boolean;
  children: React.ReactNode;
}

export default function List({ ordered, children }: Props) {
  if (ordered) {
    return <OrderedList>{children}</OrderedList>;
  }

  return <UnorderedList>{children}</UnorderedList>;
}
