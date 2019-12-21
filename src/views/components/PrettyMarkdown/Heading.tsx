import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaquery";
import {
  MOBILE_PADDING_SIZE,
  MOBILE_MAJOR_PADDING_SIZE,
  LAPTOP_PADDING_SIZE,
  LAPTOP_MAJOR_PADDING_SIZE
} from "../../constant/size";
import { TextColor, TextSize } from "../Text";
import TextThemeContext from "../TextThemeContext";

interface Props extends React.Attributes {
  level: number;
  children: React.ReactNode;
}

export default function Heading({ level, children, ...props }: Props) {
  let Component = H1;

  switch (level) {
    case 2:
      Component = H2;
      break;
    case 3:
      Component = H3;
      break;
    case 4:
      Component = H4;
      break;
    case 5:
      Component = H5;
      break;
    case 6:
      Component = H6;
      break;
  }

  return (
    <Component {...props}>
      <TextThemeContext.Provider
        value={{
          color: TextColor.highlight,
          size: SIZES.get(level),
          bold: level !== 5
        }}
      >
        {children}
      </TextThemeContext.Provider>
    </Component>
  );
}

const SIZES = new Map([
  [1, TextSize.title],
  [2, TextSize.subtitle],
  [3, TextSize.subtitle2],
  [4, TextSize.subtitle3],
  [5, TextSize.subtitle3],
  [6, TextSize.body]
]);

const H1 = styled.h1`
  box-sizing: border-box;
  margin-block-start: ${LAPTOP_MAJOR_PADDING_SIZE}px;
  margin-block-end: ${LAPTOP_PADDING_SIZE}px;

  ${MOBILE} {
    margin-block-start: ${MOBILE_MAJOR_PADDING_SIZE}px;
    margin-block-end: ${MOBILE_PADDING_SIZE}px;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }

  h1 + &,
  h2 + &,
  h3 + &,
  h4 + &,
  h5 + &,
  h6 + & {
    margin-block-start: var(--block-padding);
  }
`;
const H2 = H1.withComponent("h2");
const H3 = H1.withComponent("h3");
const H4 = H1.withComponent("h4");
const H5 = H1.withComponent("h5");
const H6 = H1.withComponent("h6");
