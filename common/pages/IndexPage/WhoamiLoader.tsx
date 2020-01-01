import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import ContentLoader from "../../components/ContentLoader";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
}

export default function WhoamiLoader(props: Props) {
  return (
    <Root {...props}>
      <FirstParagraphLine />
      <SecondParagraphLine />
      <ThirdParagraphLine />

      <FourthParagraphLine />
      <FifthParagraphLine />
      <SixthParagraphLine />
    </Root>
  );
}

const Root = styled(ContentLoader)`
  width: 100%;
  height: 242px;

  ${MOBILE} {
    height: 192px;
  }
`;

const paragraphLineCSS = css`
  x: 0px;
  rx: 3px;
  ry: 3px;
  height: 20px;

  ${MOBILE} {
    height: 16px;
  }
`;

const FirstParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 7.5px;
  width: 100%;

  ${MOBILE} {
    y: 6px;
  }
`;

const SecondParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 42.5px;
  width: 100%;

  ${MOBILE} {
    y: 34px;
  }
`;

const ThirdParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 77.5px;
  width: 40%;

  ${MOBILE} {
    y: 62px;
  }
`;

const FourthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 144.5px;
  width: 100%;

  ${MOBILE} {
    y: 114px;
  }
`;

const FifthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 179.5px;
  width: 100%;

  ${MOBILE} {
    y: 142px;
  }
`;

const SixthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 214.5px;
  width: 40%;

  ${MOBILE} {
    y: 170px;
  }
`;
