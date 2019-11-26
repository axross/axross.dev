import * as React from "react";
import useMyself from "../../hooks/useMyself";
import PrettyMarkdown from "../../components/PrettyMarkdown/PrettyMarkdown";

interface Props extends React.Attributes {
  className?: string;
}

export default function Whoami(props: Props) {
  const myself = useMyself();

  return <PrettyMarkdown {...props}>{myself.description}</PrettyMarkdown>;
}
