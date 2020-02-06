import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import ContentLoader from "../ContentLoader";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
}

export default function TwoParagraphLoader(props: Props) {
  return (
    <Root {...props}>
      <Avatar />
      <Name/>

      <FirstSocialLinkIcon />
      <FirstSocialLinkLabel />
      <SecondSocialLinkIcon />
      <SecondSocialLinkLabel />
      <ThirdSocialLinkIcon />
      <ThirdSocialLinkLabel />
      <FourthSocialLinkIcon />
      <FourthSocialLinkLabel />

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
  height: 416px;

  ${MOBILE} {
    height: 332px;
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

const socialLinkIconCSS = css`
  width: 20px;
  height: 20px;
  rx: 3px;
  ry: 3px;
`;

const socialLinkLabelCSS = css`
  width: 80px;
  height: 20px;
  rx: 3px;
  ry: 3px;

  ${MOBILE} {
    width: 64px;
    height: 16px;
  }
`;

const Avatar = styled.circle`
  cx: 48px;
  cy: 48px;
  r: 48px;

  ${MOBILE} {
    cx: 24px;
    cy: 24px;
    r: 24px;
  }
`;

const Name = styled.rect`
  x: 128px;
  y: 32px;
  width: 200px;
  height: 32px;
  rx: 3px;
  ry: 3px;

  ${MOBILE} {
    x: 64px;
    y: 12px;
    width: 150px;
    height: 24px;
  }
`;

const FirstSocialLinkIcon = styled.rect`
  ${socialLinkIconCSS}

  x: 0px;
  y: 117px;

  ${MOBILE} {
    y: 62px;
  }
`;

const FirstSocialLinkLabel = styled.rect`
  ${socialLinkLabelCSS}

  x: 28px;
  y: 117px;

  ${MOBILE} {
    y: 64px;
  }
`;

const SecondSocialLinkIcon = styled.rect`
  ${socialLinkIconCSS}

  x: calc(100% / 4);
  y: 117px;

  ${MOBILE} {
    x: calc(100% / 3);
    y: 62px;
  }
`;

const SecondSocialLinkLabel = styled.rect`
  ${socialLinkLabelCSS}

  x: calc(100% / 4 + 28px);
  y: 117px;

  ${MOBILE} {
    x: calc(100% / 3 + 28px);
    y: 64px;
  }
`;

const ThirdSocialLinkIcon = styled.rect`
  ${socialLinkIconCSS}

  x: calc(100% / 4 * 2);
  y: 117px;

  ${MOBILE} {
    x: calc(100% / 3 * 2);
    y: 62px;
  }
`;

const ThirdSocialLinkLabel = styled.rect`
  ${socialLinkLabelCSS}

  x: calc(100% / 4 * 2 + 28px);
  y: 117px;

  ${MOBILE} {
    x: calc(100% / 3 * 2 + 28px);
    y: 64px;
  }
`;

const FourthSocialLinkIcon = styled.rect`
  ${socialLinkIconCSS}

  x: calc(100% / 4 * 3);
  y: 117px;

  ${MOBILE} {
    x: 0px;
    y: 96px;
  }
`;

const FourthSocialLinkLabel = styled.rect`
  ${socialLinkLabelCSS}

  x: calc(100% / 4 * 3 + 28px);
  y: 117px;

  ${MOBILE} {
    x: 28px;
    y: 98px;
  }
`;

const FirstParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 181.5px;
  width: 100%;

  ${MOBILE} {
    y: 146px;
  }
`;

const SecondParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 216.5px;
  width: 100%;

  ${MOBILE} {
    y: 174px;
  }
`;

const ThirdParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 251.5px;
  width: 40%;

  ${MOBILE} {
    y: 202px;
  }
`;

const FourthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 318.5px;
  width: 100%;

  ${MOBILE} {
    y: 254px;
  }
`;

const FifthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 353.5px;
  width: 100%;

  ${MOBILE} {
    y: 282px;
  }
`;

const SixthParagraphLine = styled.rect`
  ${paragraphLineCSS}

  y: 388.5px;
  width: 40%;

  ${MOBILE} {
    y: 310px;
  }
`;
