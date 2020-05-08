import { css, Global } from "@emotion/core";
import * as React from "react";
import {
  LIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
  DARK_FOREGROUND_COLOR,
  LIGHT_FOREGROUND_COLOR,
} from "../constant/color";
import { DARK_MODE } from "../constant/mediaQuery";

export default function GlobalStyle() {
  const GLOBAL_STYLE = css`
    html {
      background-color: ${LIGHT_BACKGROUND_COLOR};

      ${DARK_MODE} {
        background-color: ${DARK_BACKGROUND_COLOR};
      }
    }

    body {
      margin: 0;
      color: ${LIGHT_FOREGROUND_COLOR};

      ${DARK_MODE} {
        color: ${DARK_FOREGROUND_COLOR};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: inherit;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      font-weight: inherit;
    }

    ul,
    ol {
      display: inline;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      padding-inline-end: 0;
    }

    li {
      display: inline;
    }

    a {
      text-decoration: none;
    }
  `;

  return <Global styles={GLOBAL_STYLE} />;
}
