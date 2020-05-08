import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import ContentLoader from "../ContentLoader";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
}

export default function ArtcileLoader(props: Props) {
  return (
    <Root {...props}>
      <TitleFirstLine />
      <TitleSecondLine />

      <Timestamp />

      <FirstParagraphLine />
      <SecondParagraphLine />
      <ThirdParagraphLine />

      <Picture />

      <FourthParagraphLine />
      <FifthParagraphLine />
      <SixthParagraphLine />

      <SeventhParagraphLine />
      <EighthParagraphLine />
      <NinethParagraphLine />

      <TenthParagraphLine />
      <EleventhParagraphLine />
      <TwelvethParagraphLine />
    </Root>
  );
}

const Root = styled(ContentLoader)`
  height: 1133px;

  ${MOBILE} {
    height: 794px;
  }
`;

const titleLineCSS = css`
  x: 0px;
  rx: 3px;
  ry: 3px;
  height: 46px;

  ${MOBILE} {
    height: 36px;
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

const TitleFirstLine = styled.rect`
  ${titleLineCSS}

  y: 11.5px;
  width: 100%;

  ${MOBILE} {
    y: 9px;
  }
`;

const TitleSecondLine = styled.rect`
  ${titleLineCSS}

  y: 80.5px;
  width: 64%;

  ${MOBILE} {
    y: 63px;
  }
`;

const Timestamp = styled.rect`
  x: 0;
  y: 174px;
  rx: 3px;
  ry: 3px;
  width: 160px;
  height: 16px;

  ${MOBILE} {
    y: 135px;
    width: 128px;
    height: 12px;
  }
`;

const FirstParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 233.5px;
  width: 100%;

  ${MOBILE} {
    y: 180px;
  }
`;

const SecondParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 268.5px;
  width: 100%;

  ${MOBILE} {
    y: 208px;
  }
`;

const ThirdParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 303.5px;
  width: 40%;

  ${MOBILE} {
    y: 236px;
  }
`;

const Picture = styled.rect`
  x: 0;
  y: 363px;
  rx: 3px;
  ry: 3px;
  width: 100%;
  height: 360px;

  ${MOBILE} {
    y: 282px;
    height: 188px;
  }
`;

const FourthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 762.5px;
  width: 100%;

  ${MOBILE} {
    y: 500px;
  }
`;

const FifthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 797.5px;
  width: 100%;

  ${MOBILE} {
    y: 528px;
  }
`;

const SixthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 832.5px;
  width: 40%;

  ${MOBILE} {
    y: 556px;
  }
`;

const SeventhParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 899.5px;
  width: 100%;

  ${MOBILE} {
    y: 608px;
  }
`;

const EighthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 934.5px;
  width: 100%;

  ${MOBILE} {
    y: 636px;
  }
`;

const NinethParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 969.5px;
  width: 40%;

  ${MOBILE} {
    y: 664px;
  }
`;

const TenthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 1036.5px;
  width: 100%;

  ${MOBILE} {
    y: 716px;
  }
`;

const EleventhParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 1071.5px;
  width: 100%;

  ${MOBILE} {
    y: 744px;
  }
`;

const TwelvethParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 1106.5px;
  width: 40%;

  ${MOBILE} {
    y: 772px;
  }
`;
