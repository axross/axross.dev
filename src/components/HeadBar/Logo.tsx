import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import { PROFILE_IMAGE_PATH } from "../../constant/staticFilePaths";
import UIText, { UITextType } from "../UIText";

export default function Logo() {
  return (
    <Root>
      <Image />

      <UIText type={UITextType.logo}>kohei.dev</UIText>
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
  background: center/contain no-repeat url(${PROFILE_IMAGE_PATH});
  border-radius: 50%;

  ${MOBILE} {
    width: 24px;
    height: 24px;
  }
`;
