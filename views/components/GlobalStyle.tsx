import { css, Global } from "@emotion/core";
import * as React from "react";

function GlobalStyle() {
  return <Global styles={GLOBAL_STYLE} />;
}

const GLOBAL_STYLE = css`
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
`;

export default GlobalStyle;
