import styled from "@emotion/styled";
import * as React from "react";
import ScreenSizeContext, { ScreenSize } from "../ScreenSizeContext";

interface Props extends React.Attributes {}

export default function Paragraph(props: Props) {
  const screenSize = React.useContext(ScreenSizeContext);

  return <Root _screenSize={screenSize} {...props} />;
}

const Root = styled.p<{ _screenSize: ScreenSize }>`
  box-sizing: border-box;
  display: block;
  margin-block: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? 32 : 24}px;

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
