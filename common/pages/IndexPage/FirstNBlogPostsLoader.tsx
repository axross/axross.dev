import * as React from "react";
import styled, { css } from "styled-components";
import ContentLoader from "../../components/ContentLoader";
import { MOBILE } from "../../constant/mediaQuery";

interface Props extends React.Attributes {
  className?: string;
}

export default function FirstNBlogPostsLoader(props: Props) {
  return (
    <Root {...props}>
      <FirstBlogPostTitle />
      <FirstBlogPostTimestamp />

      <SecondBlogPostTitle />
      <SecondBlogPostTimestamp />

      <ThirdBlogPostTitle />
      <ThirdBlogPostTimestamp />

      <FourthBlogPostTitle />
      <FourthBlogPostTimestamp />

      <FifthBlogPostTitle />
      <FifthBlogPostTimestamp />
    </Root>
  );
}

const Root = styled(ContentLoader)`
  height: 463px;

  ${MOBILE} {
    height: 346px;
  }
`;

const titleCSS = css`
  x: 0px;
  rx: 3px;
  ry: 3px;
  width: 100%;
  height: 20px;

  ${MOBILE} {
    height: 16px;
  }
`;

const timestampCSS = css`
  x: 0px;
  rx: 3px;
  ry: 3px;
  width: 40%;
  height: 16px;

  ${MOBILE} {
    height: 12px;
  }
`;

const FirstBlogPostTitle = styled.rect`
  ${titleCSS}

  y: 5px;

  ${MOBILE} {
    y: 4px;
  }
`;

const FirstBlogPostTimestamp = styled.rect`
  ${timestampCSS}

  y: 42px;

  ${MOBILE} {
    y: 35px;
  }
`;

const SecondBlogPostTitle = styled.rect`
  ${titleCSS}

  y: 99px;

  ${MOBILE} {
    y: 78px;
  }
`;

const SecondBlogPostTimestamp = styled.rect`
  ${timestampCSS}

  y: 136px;

  ${MOBILE} {
    y: 109px;
  }
`;

const ThirdBlogPostTitle = styled.rect`
  ${titleCSS}

  y: 193px;

  ${MOBILE} {
    y: 152px;
  }
`;

const ThirdBlogPostTimestamp = styled.rect`
  ${timestampCSS}

  y: 230px;

  ${MOBILE} {
    y: 183px;
  }
`;

const FourthBlogPostTitle = styled.rect`
  ${titleCSS}

  y: 287px;

  ${MOBILE} {
    y: 226px;
  }
`;

const FourthBlogPostTimestamp = styled.rect`
  ${timestampCSS}

  y: 324px;

  ${MOBILE} {
    y: 257px;
  }
`;

const FifthBlogPostTitle = styled.rect`
  ${titleCSS}

  y: 381px;

  ${MOBILE} {
    y: 300px;
  }
`;

const FifthBlogPostTimestamp = styled.rect`
  ${timestampCSS}

  y: 418px;

  ${MOBILE} {
    y: 331px;
  }
`;
