import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.pageProps.locale}>
        <Head>
          <meta name="theme-color" content="#000000" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />

          {/*
           * initialize google analytics only when the env var is set
           * you can comment out the env var in .env.local when you want to debug
           **/}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ? (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}', { send_page_view: false });
                  `,
                }}
              />
            </>
          ) : null}
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
