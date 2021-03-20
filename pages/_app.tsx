import { css } from "@linaria/core";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import LogRocket from "logrocket";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { mix, shade, tint } from "polished";
import * as React from "react";
import TopLoadingBar from "react-top-loading-bar";
import { IntlConfig, IntlProvider } from "react-intl";
import { OriginProvider } from "../global-hooks/url";

import "normalize.css/normalize.css";
import { getIntlMessages } from "../services/translation";

const AppEntrypoint: React.FC<AppProps> = (props) => {
  const ErrorBoundary = React.useMemo(() => {
    if (process.env.NEXT_PUBLIC_BUGSNAG_API_KEY) {
      Bugsnag.start({
        apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
        appVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
        releaseStage: process.env.NEXT_PUBLIC_RELEASE_STAGE,
        appType: typeof window !== "undefined" ? "client" : "server",
        enabledReleaseStages: ["production", "preview", "test", "local"],
        plugins: [new BugsnagPluginReact()],
      });

      return Bugsnag.getPlugin("react")!.createErrorBoundary(React);
    }

    return ({ children }: React.PropsWithChildren<any>) => children;
  }, []);

  return (
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const topLoadingBarRef = React.useRef<any>(null);
  const [intlMessages, setIntlMessages] = React.useState<
    IntlConfig["messages"]
  >(pageProps.intlMessages);

  React.useEffect(() => {
    if (
      ["production", "preview"].includes(
        process.env.NEXT_PUBLIC_RELEASE_STAGE!
      ) &&
      process.env.NEXT_PUBLIC_LOGROCKET_APP_ID
    ) {
      LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID, {
        release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
      });
    }
  }, []);

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
    getIntlMessages({
      locale: pageProps.locale ?? "en-US",
    }).then((intlMessages) => setIntlMessages(intlMessages));
  }, [pageProps.locale]);

  return (
    <>
      <OriginProvider origin={pageProps.origin}>
        <IntlProvider
          messages={intlMessages}
          locale={pageProps.locale!}
          defaultLocale="en-US"
        >
          <TopLoadingBar color="#ff6b6b" ref={topLoadingBarRef} />

          <Component {...pageProps} />
        </IntlProvider>
      </OriginProvider>
    </>
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
      --color-fg-gray: ${tint(0.5, "#8395a7")};
      --color-fg-gray-weak: ${tint(0.65, "#8395a7")};
      --color-bg: #ffffff;
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
        --color-bg: #000;
        --color-bg-input: ${shade(0.85, "#8395a7")};
        --color-bg-input-active: ${shade(0.8, "#8395a7")};
        --color-fg: ${mix(0.666, "#fff", "#8395a7")};
        --color-fg-strong: #fff;
        --color-fg-gray: ${shade(0.5, "#8395a7")};
        --color-fg-gray-weak: ${shade(0.65, "#8395a7")};
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
