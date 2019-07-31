import Head from "next/head";
import * as React from "react";

function GoogleAnalytics() {
  return (
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-79252294-3"
        key="googleAnalyticsTag1"
      />
      <script
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
  );
}

export default GoogleAnalytics;
