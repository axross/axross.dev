import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.locale}>
        <Head />

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
