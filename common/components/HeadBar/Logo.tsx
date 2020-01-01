import styled from "@emotion/styled";
import * as React from "react";
import ThemedColor from "../../types/ThemedColor";
import Text from "../Text";

export default function Logo() {
  return (
    <Root>
      <Image />

      <Text color={ThemedColor.emphasizedForeground}>kohei.dev</Text>
    </Root>
  );
}

const Root = styled.h1`
  display: inline-grid;
  grid-template-columns: 24px auto;
  align-items: center;
  column-gap: 8px;
`;

const Image = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: center/contain no-repeat url("/profile.jpg");
  border-radius: 50%;
`;
