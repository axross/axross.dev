import * as React from "react";
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import { PRECONNECT_URLS } from "../settings";

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

          {Array.from(PRECONNECT_URLS).map(url => (
            <link
              rel="preconnect"
              href={url}
              key={`configured-preconnect:${url}`}
            />
          ))}
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context);

    return { ...initialProps };
  }
}
