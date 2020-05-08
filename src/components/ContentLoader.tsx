import styled from "@emotion/styled";
import * as React from "react";
import ReactContentLoader, { IContentLoaderProps } from "react-content-loader";
import {
  DARK_LOADER_COLOR,
  LIGHT_LOADER_COLOR,
  DARK_LOADER_HIGHLIGHT_COLOR,
  LIGHT_LOADER_HIGHLIGHT_COLOR,
} from "../constant/color";
import { DARK_MODE } from "../constant/mediaQuery";

type Props = Omit<
  IContentLoaderProps,
  | "viewBox"
  | "width"
  | "height"
  | "primaryColor"
  | "secondaryColor"
  | "primaryOpacity"
  | "secondaryOpacity"
>;

export default function ContentLoader({ children, ...props }: Props) {
  return (
    <Root
      viewBox={undefined}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMin slice"
      {...props}
    >
      {children}
    </Root>
  );
}

const Root = styled(ReactContentLoader)`
  width: 100%;

  & > defs {
    & > linearGradient {
      & > stop:nth-of-type(2n) {
        stop-color: ${LIGHT_LOADER_HIGHLIGHT_COLOR};

        ${DARK_MODE} {
          stop-color: ${DARK_LOADER_HIGHLIGHT_COLOR};
        }
      }

      & > stop:nth-of-type(2n + 1) {
        stop-color: ${LIGHT_LOADER_COLOR};

        ${DARK_MODE} {
          stop-color: ${DARK_LOADER_COLOR};
        }
      }
    }
  }
`;
