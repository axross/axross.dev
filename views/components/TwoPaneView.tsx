import styled from "@emotion/styled";
import * as React from "react";
import { MEDIA_MOBILE } from "../constant/mediaquery";
import {
  LAPTOP_MAJOR_PADDING_SIZE,
  LAPTOP_SECTION_MARGIN_SIZE,
  MOBILE_PADDING_SIZE,
  MOBILE_SECTION_MARGIN_SIZE
} from "../constant/size";

interface Props extends React.Attributes {
  className?: string;
  children: [React.ReactElement<PaneProps>, React.ReactElement<PaneProps>];
}

function TwoPaneView({ children, ...props }: Props) {
  const [leftPane, rightPane] = React.Children.toArray(children);

  return (
    <Root {...props}>
      {leftPane}

      {rightPane}
    </Root>
  );
}

interface PaneProps extends React.Attributes {
  className?: string;
  children?: React.ReactNode;
}

export const LeftPane = styled.div<PaneProps>`
  grid-area: left;
  padding-block-start: ${LAPTOP_SECTION_MARGIN_SIZE}px;

  ${MEDIA_MOBILE} {
    display: block;
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
  }
`;

export const RightPane = styled.div<PaneProps>`
  grid-area: right;
  padding-block-start: ${LAPTOP_SECTION_MARGIN_SIZE}px;
  padding-block-end: ${LAPTOP_SECTION_MARGIN_SIZE}px;
  padding-inline-end: ${LAPTOP_MAJOR_PADDING_SIZE}px;

  ${MEDIA_MOBILE} {
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_SECTION_MARGIN_SIZE}px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
  }
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: 400px calc(100% - 400px);
  grid-template-areas: "left right";
  justify-content: center;
  width: 100vw;
  max-width: 1200px;
  margin-inline-start: auto;
  margin-inline-end: auto;

  ${MEDIA_MOBILE} {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;
    grid-template-areas: "left" "right";
  }
`;

export default TwoPaneView;
