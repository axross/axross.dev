import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE_MINOR_PADDING_SIZE, MOBILE_PADDING_SIZE, LAPTOP_MINOR_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import { MOBILE } from "../../constant/mediaquery";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function OrderedList(props: Props) {
  return <Root>{props.children}</Root>
}

const Root = styled.ol`
  box-sizing: border-box;
  display: block;
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-start: 36px;

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

  li {
    display: list-item;
    margin-block-start: ${LAPTOP_MINOR_PADDING_SIZE}px;
    margin-block-end: ${LAPTOP_MINOR_PADDING_SIZE}px;

    ${MOBILE} {
      margin-block-start: ${MOBILE_MINOR_PADDING_SIZE}px;
      margin-block-end: ${MOBILE_MINOR_PADDING_SIZE}px;
    }

    &:first-of-type {
      margin-block-start: 0;
    }

    &:last-of-type {
      margin-block-end: 0;
    }

    & > p:first-of-type {
      display: inline;
    }

    & > p + ul,
    & > p + ol,
    & > span + ul,
    & > span + ol {
      margin-block-start: ${LAPTOP_MINOR_PADDING_SIZE}px;

      ${MOBILE} {
        margin-block-start: ${MOBILE_MINOR_PADDING_SIZE}px;
      }
    }
  }
`
