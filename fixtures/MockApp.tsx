import { action } from "@storybook/addon-actions";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import Router, { NextRouter } from "next/router";
import * as React from "react";
import LocaleString from "../src/entities/LocaleString";
import { LocaleContext } from "../src/hooks/useLocale";
import { URLContext } from "../src/hooks/useURL";

interface Props {
  url?: URL;
  currentLocale?: LocaleString;
  availableLocales?: LocaleString[];
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function MockApp({
  url,
  currentLocale = DEFAULT_CURRENT_LOCALE,
  availableLocales = DEFAULT_AVAILABLE_LOCALES,
  isLoading = DEFAULT_IS_LOADING,
  children,
}: Props) {
  if (!url) {
    url = new URL(`https://tests.kohei.dev/?hl=${currentLocale}`);
  }

  const router = React.useMemo<NextRouter>(() => ({
    route: url!.pathname,
    pathname: url!.pathname,
    query: Array.from(url!.searchParams.entries())
      .reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {} as Record<string, string>
      ),
    asPath: url!.href.substring(url!.origin.length),
    push: (url, as, options) => {
      action("router#push")(url, as, options);

      return Promise.resolve(true);
    },
    replace: (url, as, options) => {
      action("router#replace")(url, as, options);

      return Promise.resolve(true);
    },
    reload: () => action("router#replace")(),
    back: () => action("router#back")(),
    prefetch: url => {
      action("router#prefetch")(url);

      return Promise.resolve();
    },
    beforePopState: cb => {
      action("router#beforePopState")(cb);
    },
    events: {
      on: (type, handler) => {
        action("router#events.on")(type, handler);
      },
      off: (type, handler) => {
        action("router#events.off")(type, handler);
      },
      emit: (type, ...evts) => {
        action("router#events.emit")(type, ...evts);
      },
    },
  }), []);

  React.useEffect(() => {
    Router.router = router as any;
  }, []);
  
  return (
    <URLContext.Provider value={url}>
      <RouterContext.Provider value={router}>
        <LocaleContext.Provider value={{ currentLocale, availableLocales, isLoading }}>
          {children}
        </LocaleContext.Provider>
      </RouterContext.Provider>
    </URLContext.Provider>
  );
}

const DEFAULT_CURRENT_LOCALE = "en-US";
const DEFAULT_AVAILABLE_LOCALES = ["en-US", "ja-JP"];
const DEFAULT_IS_LOADING = false;
