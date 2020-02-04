import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import ContentLoader from "../ContentLoader";

interface Props extends React.Attributes {
  className?: string;
}

export default function LocaleSwitcherLoader(props: Props) {
  return (
    <Root {...props}>
      <LeftLocale />

      <RightLocale />
    </Root>
  );
}

const Root = styled(ContentLoader)`
  width: 110px;
  height: 24px;

  ${MOBILE} {
    height: 94;
  }
`;

const itemCSS = css`
  y: 4px;
  rx: 3px;
  ry: 3px;
  height: 16px;

  ${MOBILE} {
    y: 3px;
    height: 12px;
  }
`;

const LeftLocale = styled.rect`
  ${itemCSS}

  x: 0px;
  width: 54px;

  ${MOBILE} {
    x: 40px;
  }
`;

const RightLocale = styled.rect`
  ${itemCSS}

  x: 62px;
  width: 48px;

  ${MOBILE} {
    x: 48px;
    width: 46px;
  }
`;
