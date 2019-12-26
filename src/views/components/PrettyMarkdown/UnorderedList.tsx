import styled from "@emotion/styled";
import * as React from "react";
import ScreenSizeContext, { ScreenSize } from "../ScreenSizeContext";

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function UnorderedList(props: Props) {
  const screenSize = React.useContext(ScreenSizeContext);

  return <Root _screenSize={screenSize}>{props.children}</Root>;
}

const Root = styled.ul<{ _screenSize: ScreenSize }>`
  box-sizing: border-box;
  display: block;
  margin-block: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? "32px" : "24px"};
  padding-inline-start: 36px;

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  li {
    display: list-item;
    margin-block: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? "12px" : "8px"};

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
      margin-block-start: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? "12px" : "8px"};
    }
  }
`;
