import * as React from "react";
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import LocaleString from "../entities/LocaleString";
import getLocale from "../utility/getLocale";
import GlobalStyle from "../views/components/GlobalStyle";
import GoogleAnalytics from "../views/components/GoogleAnalytics";

interface Props {
  locale: LocaleString;
}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang={this.props.locale.split("-")[0]}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,height=device-height"
            key="viewport"
          />
          <link
            rel="shortcut icon"
            href="/static/shortcut-icon.png"
            key="shortcutIcon"
          />
          <meta name="theme-color" content="#087da1" key="themeColor" />
        </Head>

        <body>
          <Main />

          <NextScript />

          <GoogleAnalytics />

          <GlobalStyle />
        </body>
      </Html>
    );
  }

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context);
    const locale = getLocale(context.query);

    return { ...initialProps, locale };
  }
}

export default Document;
