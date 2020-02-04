import { css } from "@emotion/core";
import styled from "@emotion/styled";
import * as React from "react";
import { DARK_COLOR, LIGHT_COLOR } from "../../../constant/color";
import { DARK_MODE, MOBILE } from "../../../constant/mediaQuery";
import ThemedColor from "../../../types/ThemedColor";
import ContentLoader from "../../ContentLoader";

interface Props extends React.Attributes {
  className?: string;
}

export default function EmbededLinkLoader({ ...props }: Props) {
  return (
    <Root {...props}>
      <_ContentLoader>
        <Image />

        <TitleFirstLine />
        <TitleSecondLine />

        <DescriptionFirstLine/>
        <DescriptionSecondLine/>

        <URLLine />
      </_ContentLoader>
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  margin-block-start: 32px;
  margin-block-end: 32px;
  margin-inline-start: -32px;
  margin-inline-end: -32px;
  padding-block-start: 32px;
  padding-block-end: 32px;
  padding-inline-start: 32px;
  padding-inline-end: 32px;
  background-color: ${LIGHT_COLOR[ThemedColor.secondaryBackground]};
  border-radius: 8px;

  ${DARK_MODE} {
    background-color: ${DARK_COLOR[ThemedColor.secondaryBackground]};
  }

  ${MOBILE} {
    width: 100vw;
    margin-block-start: 20px;
    margin-block-end: 20px;
    margin-inline-start: calc(-1 * (100vw - 100%) / 2);
    margin-inline-end: calc(-1 * (100vw - 100%) / 2);
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-inline-start: calc((100vw - 100%) / 2);
    padding-inline-end: calc((100vw - 100%) / 2);
    border-radius: 0;
  }

  &:first-child {
    margin-block-start: 0;
  }

  &:last-child {
    margin-block-end: 0;
  }
`;

const _ContentLoader = styled(ContentLoader)`
  // intentionally omit 4px margin in the bottom
  // in the actual ui, it is neutralized by padding of the box
  height: 160px;

  ${MOBILE} {
    // intentionally omit 3px by the same reason
    height: 75px;
  }
`;

const titleLineCSS = css`
  x: calc(160px + 32px);
  rx: 3px;
  ry: 3px;
  height: 20px;

  ${MOBILE} {
    x: calc(64px + 20px);
    height: 16px;
  }
`;

const descriptionLineCSS = css`
  x: calc(160px + 32px);
  rx: 3px;
  ry: 3px;
  height: 16px;

  ${MOBILE} {
    x: calc(64px + 20px);
    height: 12px;
  }
`;

const Image = styled.rect`
  x: 0px;
  y: 0px;
  width: 160px;
  height: 160px;
  rx: 4px;
  ry: 4px;

  ${MOBILE} {
    width: 64px;
    height: 64px;
  }
`;

const TitleFirstLine = styled.rect`
  ${titleLineCSS}

  y: 5px;
  width: calc(100% - 160px - 32px);

  ${MOBILE} {
    y: 4px;
    width: calc(100% - 64px - 20px);
  }
`;

const TitleSecondLine = styled.rect`
  ${titleLineCSS}

  y: 35px;
  width: calc((100% - 192px) * 0.4);

  ${MOBILE} {
    y: 28px;
    width: calc((100% - 64px - 20px) * 0.4);
  }
`;

const DescriptionFirstLine = styled.rect`
  ${descriptionLineCSS}

  y: 80px;
  width: calc(100% - 160px - 32px);

  ${MOBILE} {
    display: none;
  }
`;

const DescriptionSecondLine = styled.rect`
  ${descriptionLineCSS}

  y: 104px;
  width: calc((100%  - 160px - 32px) * 0.55);

  ${MOBILE} {
    display: none;
  }
`;

const URLLine = styled.rect`
  ${descriptionLineCSS}

  y: 144px;
  width: calc((100%  - 160px - 32px) * 0.7);

  ${MOBILE} {
    y: 63px;
    width: calc((100% - 64px - 20px) * 0.7);
  }
`;