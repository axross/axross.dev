import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import RawText, { TextLineSize } from "../RawText";

interface Props extends React.Attributes {
  children?: React.ReactNode;
}

export default function Paragraph({ children, ...props }: Props) {
  return (
    <Root {...props}>
      {React.Children.map(children, (child) =>
        typeof child === "string" ? (
          <RawText lineSize={TextLineSize.large}>{child}</RawText>
        ) : (
          child
        )
      )}
    </Root>
  );
}

const Root = styled.p`
  box-sizing: border-box;
  display: block;
  margin-block-start: 32px;
  margin-block-end: 32px;

  ${MOBILE} {
    margin-block-start: 24px;
    margin-block-end: 24px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
