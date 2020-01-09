import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";
import Text, { TextType } from "../Text";

export default function Logo() {
  return (
    <Root>
      <Image />

      <Text type={TextType.logo} color={ThemedColor.emphasizedForeground}>kohei.dev</Text>
    </Root>
  );
}

const Root = styled.h1`
  display: grid;
  grid-template-columns: 48px auto;
  align-items: center;
  column-gap: 16px;

  ${MOBILE} {
    grid-template-columns: 24px auto;
    column-gap: 8px;
  }
`;

const Image = styled.span`
  display: block;
  width: 48px;
  height: 48px;
  background: center/contain no-repeat url("/profile.jpg");
  border-radius: 50%;

  ${MOBILE} {
    width: 24px;
    height: 24px;
  }
`;
