import * as React from "react";
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import GlobalStyle from "../views/components/GlobalStyle";
import { FOREGROUND_COLORS, ForegroundColor } from "../views/constant/color";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,height=device-height"
            key="viewport"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/static/favicon.png"
            key="shortcutIcon"
          />
          <meta
            name="theme-color"
            content={FOREGROUND_COLORS.get(ForegroundColor.normal)!.light}
            key="themeColor"
          />
          <script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=UA-79252294-3"
            key="googleAnalyticsTag1"
          />
          <script
            defer
            key="googleAnalyticsTag2"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-79252294-3');
            `
            }}
          />
        </Head>

        <body>
          <Main />

          <NextScript />

          <GlobalStyle />
        </body>
      </Html>
    );
  }

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context);

    return { ...initialProps };
  }
}
