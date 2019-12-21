import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import { MOBILE } from "../../constant/mediaquery";

interface Props extends React.Attributes {}

export default function Paragraph(props: Props) {
  return <Root {...props} />;
}

const Root = styled.p`
  box-sizing: border-box;
  display: block;
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;

  ${MOBILE} {
    margin-block-start: ${MOBILE_PADDING_SIZE}px;
    margin-block-end: ${MOBILE_PADDING_SIZE}px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
