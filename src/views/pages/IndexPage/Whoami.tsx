import * as React from "react";
import Person from "../../../entities/Person";
import PrettyMarkdown from "../../components/PrettyMarkdown/PrettyMarkdown";

interface Props extends React.Attributes {
  person: Person;
  className?: string;
}

export default function Whoami({ person, ...props }: Props) {
  return <PrettyMarkdown {...props}>{person.description}</PrettyMarkdown>;
}
