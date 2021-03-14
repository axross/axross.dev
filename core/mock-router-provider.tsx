import { NextRouter } from "next/dist/next-server/lib/router/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import * as React from "react";

export type MockRouterProviderProps = React.PropsWithChildren<NextRouter>;

/**
 *
 *
 * Do not use for production code.
 */
export function MockRouterProvider({
  pathname = "/",
  query = {},
  asPath = "/",
  push = () => Promise.resolve(false),
  replace = () => Promise.resolve(false),
  prefetch = () => Promise.resolve(undefined),
  beforePopState = () => {},
  back = () => {},
  reload = () => {},
  events: { on: eventsOn = () => {}, off: eventsOff = () => {} } = {
    on: () => {},
    off: () => {},
  } as any,
  locale = "en-US",
  locales = ["en-US", "ja-JP", "du_My"],
  defaultLocale = "en-US",
  domainLocales = [
    {
      domain: "dummy.kohei.dev",
      locales: ["du_My"],
      defaultLocale: "du_My",
    },
    {
      domain: "ja.kohei.dev",
      locales: ["ja-JP"],
      defaultLocale: "ja-JP",
    },
  ],
  isLocaleDomain = false,
  children,
}: MockRouterProviderProps) {
  const nextRouterMock = {
    pathname,
    query,
    asPath,
    isFallback: false,
    basePath: "/",
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isLocaleDomain,
    push,
    replace,
    prefetch,
    beforePopState,
    back,
    reload,
    events: {
      on: eventsOn,
      off: eventsOff,
    },
  };

  return (
    <RouterContext.Provider value={nextRouterMock as any}>
      {children}
    </RouterContext.Provider>
  );
}
