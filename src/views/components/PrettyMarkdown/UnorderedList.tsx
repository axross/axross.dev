import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function UnorderedList(props: Props) {
  return <Root>{props.children}</Root>;
}

const Root = styled.ul`
  box-sizing: border-box;
  display: block;
  margin-block: 32px;
  padding-inline-start: 36px;

  ${MOBILE} {
    margin-block: 24px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  li {
    display: list-item;
    margin-block: 12px;

    ${MOBILE} {
      margin-block: 8px;
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
      margin-block-start: 12px;

      ${MOBILE} {
        margin-block-start: 8px;
      }
    }
  }
`;
