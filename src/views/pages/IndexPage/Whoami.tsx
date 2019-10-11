import * as React from "react";
import useMyself from "../../hooks/useMyself";
import PrettyMarkdown from "../../components/PrettyMarkdown";

interface Props extends React.Attributes {
  className?: string;
}

function Whoami(props: Props) {
  const myself = useMyself();

  return <PrettyMarkdown {...props}>{myself.description}</PrettyMarkdown>;
}

export default Whoami;
