import * as React from "react";
import styled from "styled-components";
import { DARK_COLOR, LIGHT_COLOR } from "../../constant/color";
import { DARK_MODE, MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function UnorderedList(props: Props) {
  return <Root>{props.children}</Root>;
}

const Root = styled.ul`
  box-sizing: border-box;
  display: block;
  margin-block-start: 32px;
  margin-block-end: 32px;
  padding-inline-start: 36px;
  color: ${LIGHT_COLOR[ThemedColor.foreground]};
  font-size: 20px;

  ${MOBILE} {
    margin-block-start: 24px;
    margin-block-end: 24px;
    font-size: 16px;
  }

  ${DARK_MODE} {
    color: ${DARK_COLOR[ThemedColor.foreground]};
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  li {
    display: list-item;
    margin-block-start: 12px;
    margin-block-end: 12px;

    ${MOBILE} {
      margin-block-start: 8px;
      margin-block-end: 8px;
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
