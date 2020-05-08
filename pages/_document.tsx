import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import GlobalStyle from "../components/GlobalStyle";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />

          <GlobalStyle />

          <NextScript />
        </body>
      </Html>
    );
  }
}
