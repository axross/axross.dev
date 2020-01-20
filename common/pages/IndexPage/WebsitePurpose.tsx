import * as React from "react";
import styled from "styled-components";
import PrettyMarkdown from "../../components/PrettyMarkdown";

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
