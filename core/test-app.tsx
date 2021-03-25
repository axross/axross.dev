import { NextRouter } from "next/dist/next-server/lib/router/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { OriginProvider } from "../global-hooks/url";

interface TestAppProps extends React.Attributes {
  origin?: string;
  router?: {
    pathname?: string;
    query?: Record<string, string | string[]>;
    asPath?: string;
    push?: (...params: Parameters<NextRouter["push"]>) => void;
    replace?: (...params: Parameters<NextRouter["replace"]>) => void;
    prefetch?: (...params: Parameters<NextRouter["prefetch"]>) => void;
    beforePopState?: (
      ...params: Parameters<NextRouter["beforePopState"]>
    ) => void;
    back?: (...params: Parameters<NextRouter["back"]>) => void;
    reload?: (...params: Parameters<NextRouter["reload"]>) => void;
  };
  intl?: {
    messages?: Record<string, any>;
    locale?: string;
    defaultLocale?: string;
  };
}

export const TestApp: React.FC<TestAppProps> = ({
  origin = "https://dummy.kohei.dev",
  router: {
    pathname = "/",
    query = {},
    asPath = "/",
    push = () => {},
    replace = () => {},
    prefetch = () => {},
    beforePopState = () => {},
    back = () => {},
    reload = () => {},
  } = {},
  intl: { messages = {}, locale = "en-US", defaultLocale = "en-US" } = {},
  children,
}) => {
  const nextRouterMock: NextRouter = {
    pathname,
    query,
    asPath,
    push: (...args) => {
      push(...args);

      return Promise.resolve(false);
    },
    replace: (...args) => {
      replace(...args);

      return Promise.resolve(false);
    },
    prefetch: (...args) => {
      prefetch(...args);

      return Promise.resolve(undefined);
    },
    beforePopState,
    back,
    reload,
    route: "",
    basePath: "",
    events: { on: () => {}, off: () => {}, emit: () => {} },
    isLocaleDomain: false,
    isFallback: false,
    isReady: true,
    isPreview: false,
  };

  return (
    <RouterContext.Provider value={nextRouterMock}>
      <OriginProvider origin={origin}>
        <IntlProvider
          messages={messages}
          locale={locale}
          defaultLocale={defaultLocale}
        >
          {children}
        </IntlProvider>
      </OriginProvider>
    </RouterContext.Provider>
  );
};
