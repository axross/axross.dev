import { createGlobalStyle } from "styled-components";
import { DARK_COLOR, LIGHT_COLOR } from "../constant/color";
import { DARK_MODE } from "../constant/mediaQuery";
import ThemedColor from "../types/ThemedColor";

export default createGlobalStyle`
  html {
    background-color: ${LIGHT_COLOR[ThemedColor.background]};

    ${DARK_MODE} {
      background-color: ${DARK_COLOR[ThemedColor.background]};
    }
  }

  body {
    margin: 0;
    color: ${LIGHT_COLOR[ThemedColor.foreground]};

    ${DARK_MODE} {
      color: ${DARK_COLOR[ThemedColor.foreground]};
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