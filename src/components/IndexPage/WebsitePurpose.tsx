import styled from "@emotion/styled";
import * as React from "react";
import PrettyMarkdown from "../PrettyMarkdown";

interface Props extends React.Attributes {
  className?: string;
  children: string;
}

export default function WebsitePurpose({ children, ...props }: Props) {
  return (
    <Root {...props}>
      <PrettyMarkdown>
        {children}
      </PrettyMarkdown>
    </Root>
  );
}

const Root = styled.div`
  
`;
