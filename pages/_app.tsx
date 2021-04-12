import { css } from "@linaria/core";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { mix, shade, tint, transparentize } from "polished";
import * as React from "react";
import { IntlProvider } from "react-intl";
import TopLoadingBar from "react-top-loading-bar";
import { RecoilRoot } from "recoil";
import { FALLBACK_LOCALE } from "../constants/locale";
import { useUserMonitoring } from "../hooks/user-monitoring";
import { useTranslationDictionary } from "../hooks/translation";

import "normalize.css/normalize.css";

// initialize sentry client only when the env var is set
// you can comment out the env var in .env.local when you want to debug
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    release: process.env.NEXT_PUBLIC_VERSION,
    environment: process.env.NEXT_PUBLIC_RELEASE_STAGE,
    tracesSampleRate: 1.0,
    beforeSend(event, _hint) {
      if (globalThis === globalThis.window && event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }

      return event;
    },
  });
}

const AppEntrypoint: React.FC<AppProps> = (props) => {
  return (
    <Sentry.ErrorBoundary>
      <RecoilRoot>
        <App {...props} />
      </RecoilRoot>
    </Sentry.ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { trackPageView } = useUserMonitoring();
  const topLoadingBarRef = React.useRef<any>(null);
  const { dictionary } = useTranslationDictionary(pageProps.locale!);

  React.useEffect(() => {
    const onRouteChangeStart = () => {
      topLoadingBarRef.current.staticStart();
    };

    const onRouteChangeComplete = () => {
      topLoadingBarRef.current.complete();
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  React.useEffect(() => {
    trackPageView();

    const onRouteChangeComplete = () => {
      trackPageView();
    };

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [trackPageView]);

  return (
    <IntlProvider
      messages={dictionary ?? pageProps.intlMessages}
      locale={pageProps.locale!}
      defaultLocale={FALLBACK_LOCALE}
    >
      <TopLoadingBar color="#ff6b6b" ref={topLoadingBarRef} />

      <Component {...pageProps} />
    </IntlProvider>
  );
};

// this generates global css file in build process
css`
  :global() {
    @import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

    * {
      outline-offset: 4px;
    }

    * {
      box-sizing: border-box;
    }

    html {
      --space-xxl: 64px;
      --space-xl: 32px;
      --space-lg: 24px;
      --space-md: 16px;
      --space-sm: 8px;
      --space-xs: 4px;
      --color-fg: ${mix(0.666, "#000", "#8395a7")};
      --color-fg-weak: #8395a7;
      --color-fg-strong: #000;
      --color-fg-red: #ff6b6b;
      --color-fg-blue: #54a0ff;
      --color-fg-yellow: #feca57;
      --color-fg-red-weak: ${tint(0.5, "#ff6b6b")};
      --color-fg-blue-weak: ${tint(0.5, "#54a0ff")};
      --color-fg-yellow-weak: ${tint(0.5, "#feca57")};
      --color-fg-gray: ${tint(0.5, "#8395a7")};
      --color-fg-gray-weak: ${tint(0.65, "#8395a7")};
      --color-bg: #fff;
      --color-bg-frosted: ${transparentize(0.15, "#fff")};
      --color-bg-input: ${tint(0.85, "#8395a7")};
      --color-bg-input-active: ${tint(0.8, "#8395a7")};
      --color-bg-red-weak: ${tint(0.75, "#ff6b6b")};
      --color-bg-blue-weak: ${tint(0.75, "#54a0ff")};
      --color-bg-yellow-weak: ${tint(0.75, "#feca57")};
      --color-bg-gray: ${tint(0.8, "#8395a7")};
      --color-bg-gray-weak: ${tint(0.9, "#8395a7")};
      --font-size-xxl: 40px;
      --font-size-xl: 32px;
      --font-size-lg: 24px;
      --font-size-md: 18px;
      --font-size-sm: 16px;
      --font-size-xs: 12px;

      background-color: var(--color-bg);
      color: var(--color-fg);
      font-size: var(--font-size-md);
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      scroll-behavior: smooth;
    }

    @media screen and (prefers-color-scheme: dark) {
      html {
        --color-fg: ${mix(0.666, "#fff", "#8395a7")};
        --color-fg-strong: #fff;
        --color-fg-red-weak: ${shade(0.5, "#ff6b6b")};
        --color-fg-blue-weak: ${shade(0.5, "#54a0ff")};
        --color-fg-yellow-weak: ${shade(0.5, "#feca57")};
        --color-fg-gray: ${shade(0.5, "#8395a7")};
        --color-fg-gray-weak: ${shade(0.65, "#8395a7")};
        --color-bg: #000;
        --color-bg-frosted: ${transparentize(0.15, "#000")};
        --color-bg-input: ${shade(0.85, "#8395a7")};
        --color-bg-input-active: ${shade(0.8, "#8395a7")};
        --color-bg-red-weak: ${shade(0.75, "#ff6b6b")};
        --color-bg-blue-weak: ${shade(0.75, "#54a0ff")};
        --color-bg-yellow-weak: ${shade(0.75, "#feca57")};
        --color-bg-gray: ${shade(0.8, "#8395a7")};
        --color-bg-gray-weak: ${shade(0.9, "#8395a7")};
      }
    }

    @media screen and (max-width: 480px) {
      html {
        --font-size-xxl: 36px;
        --font-size-xl: 28px;
        --font-size-lg: 24px;
        --font-size-md: 18px;
        --font-size-sm: 16px;
        --font-size-xs: 12px;
      }
    }
  }
`;

export default AppEntrypoint;
