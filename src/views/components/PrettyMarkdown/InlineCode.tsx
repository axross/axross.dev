import styled from "@emotion/styled";
import * as React from "react";
import { DARK_MODE, MOBILE } from "../../constant/mediaquery";
import {
  BACKGROUND_COLORS,
  BackgroundColor,
  FOREGROUND_COLORS
} from "../../constant/color";
import { MOBILE_TEXT_SIZE, LAPTOP_TEXT_SIZE } from "../../constant/size";
import { TextColor } from "../Text";

interface Props extends React.Attributes {}

export default function InlineCode(props: Props) {
  return <Root {...props} />;
}

const Root = styled.code`
  box-sizing: border-box;
  background-color: ${BACKGROUND_COLORS.get(BackgroundColor.code)!.light};
  margin-inline-start: -0.2em;
  margin-inline-end: -0.2em;
  padding-block-start: 0.2em;
  padding-block-end: 0.2em;
  padding-inline-start: 0.2em;
  padding-inline-end: 0.2em;
  border-radius: 4px;
  line-height: 1.75;
  color: ${FOREGROUND_COLORS.get(TextColor.normal)!.light};
  font-size: ${LAPTOP_TEXT_SIZE}px;
  font-family: "Source Code Pro", monospace;
  font-weight: 500;
  text-align: start;
  word-break: break-word;

  ${MOBILE} {
    font-size: ${MOBILE_TEXT_SIZE}px;
  }

  ${DARK_MODE} {
    background-color: ${BACKGROUND_COLORS.get(BackgroundColor.code)!.dark};
    color: ${FOREGROUND_COLORS.get(TextColor.normal)!.dark};
  }
`;
