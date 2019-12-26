import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {}

export default function Paragraph(props: Props) {
  return <Root {...props} />;
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
