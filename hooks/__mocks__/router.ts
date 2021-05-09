import { ExtendedRouter } from "../router";

export function useRouter(): ExtendedRouter {
  return {
    route: "/path/to/[route]",
    pathname: "/path/to/[route]",
    asPath: "/path/to/route",
    query: {},
    basePath: "",
    isFallback: false,
    isReady: true,
    isPreview: false,
    locale: "ja-jp",
    locales: ["en-us", "ja-jp"],
    defaultLocale: "en-us",
    alternativeLocales: ["en-us"],
    isLocaleDomain: false,
    url: new URL("/path/to/route", "https://dummy.kohei.dev"),
    push: () => Promise.resolve(false),
    replace: () => Promise.resolve(false),
    prefetch: () => Promise.resolve(),
    reload: () => {},
    back: () => {},
    beforePopState: () => {},
    events: { on: () => {}, off: () => {}, emit: () => {} },
  };
}
