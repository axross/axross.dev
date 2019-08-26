import { css, Global } from "@emotion/core";
import * as React from "react";
import { BACKGROUND_COLORS, BackgroundColor } from "../constant/color";
import { DARK_MODE } from "../constant/mediaquery";

function GlobalStyle() {
  return <Global styles={GLOBAL_STYLE} />;
}

const GLOBAL_STYLE = css`
  html {
    background-color: ${BACKGROUND_COLORS.get(BackgroundColor.normal)!.light};
  }

  body {
    margin: 0;
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

  ${DARK_MODE} {
    html {
      background-color: ${BACKGROUND_COLORS.get(BackgroundColor.normal)!.dark};
    }
  }
`;

export default GlobalStyle;
