import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import { MOBILE, DARK_MODE } from "../../constant/mediaquery";
import { BACKGROUND_COLORS, BackgroundColor } from "../../constant/color";

interface Props extends React.Attributes {
  value: string;
}

export default function Blockquote(props: Props) {
  return <Root {...props} />;
}

const Root = styled.blockquote`
  box-sizing: border-box;
  max-width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  width: calc(100% + ${LAPTOP_PADDING_SIZE}px * 2);
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;
  margin-inline-start: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  margin-inline-end: calc(-1 * ${LAPTOP_PADDING_SIZE}px);
  padding-block-start: ${LAPTOP_PADDING_SIZE}px;
  padding-block-end: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-start: ${LAPTOP_PADDING_SIZE}px;
  padding-inline-end: ${LAPTOP_PADDING_SIZE}px;
  border-radius: 8px;
  background-color: ${BACKGROUND_COLORS.get(BackgroundColor.highlight)!.light};
  font-style: italic;

  ${MOBILE} {
    max-width: calc(100% + 20px * 2);
    width: calc(100% + 20px * 2);
    margin-block-start: ${MOBILE_PADDING_SIZE}px;
    margin-block-end: ${MOBILE_PADDING_SIZE}px;
    margin-inline-start: -20px;
    margin-inline-end: -20px;
    padding-block-start: ${MOBILE_PADDING_SIZE}px;
    padding-block-end: ${MOBILE_PADDING_SIZE}px;
    padding-inline-start: 20px;
    padding-inline-end: 20px;
    border-radius: 0;
  }

  ${DARK_MODE} {
    background-color: ${BACKGROUND_COLORS.get(BackgroundColor.highlight)!.dark};
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;
