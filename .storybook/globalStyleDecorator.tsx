import { css, Global } from "@emotion/core";
import { makeDecorator } from '@storybook/addons';
import * as React from "react";
import GlobalStyle from "../src/components/GlobalStyle";

export default makeDecorator({
  name: 'withGlobalStyle',
  parameterName: 'globalStyle',
  wrapper: (storyFn, context) => (
    <>
      <GlobalStyle />

      <Global styles={OVERRIDE_GLOBAL_STYLE} />
      
      {storyFn(context)}
    </>
  ),
});

const OVERRIDE_GLOBAL_STYLE = css`
  html {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAABlBMVEX////Y2NgXsaIHAAAAE0lEQVR4AWNgYPj/n4oElU1jAADtvT/BfzVwSgAAAABJRU5ErkJggg==");

    @media (prefers-color-scheme: dark) {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAABlBMVEUAAAAnJyfnqu6kAAAAE0lEQVR4AWNgYPj/n4oElU1jAADtvT/BfzVwSgAAAABJRU5ErkJggg==");
    }
  }

  body {
    margin: 8px;
  }
`;
