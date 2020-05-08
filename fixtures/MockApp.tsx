import { action } from "@storybook/addon-actions";
import { HeadManagerContext } from "next/dist/next-server/lib/head-manager-context";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import Router, { NextRouter } from "next/router";
import * as React from "react";
import LocaleString from "../src/entities/LocaleString";
import { LocaleContext } from "../src/hooks/useLocale";
import { URLContext } from "../src/hooks/useURL";
import { Repositories, RepositoryContext } from "../src/hooks/useRepository";

interface Props {
  url?: URL;
  repositories?: Partial<Repositories>;
  currentLocale?: LocaleString;
  availableLocales?: LocaleString[];
  isLoading?: boolean;
  onHeadChange?: (elements: React.ReactElement[]) => void;
  children: React.ReactNode;
}

export default function MockApp({
  url,
  repositories = {},
  currentLocale = DEFAULT_CURRENT_LOCALE,
  availableLocales = DEFAULT_AVAILABLE_LOCALES,
  isLoading = DEFAULT_IS_LOADING,
  onHeadChange = () => {},
  children,
}: Props) {
  if (!url) {
    url = new URL(`https://tests.kohei.dev/?hl=${currentLocale}`);
  }

  const router = React.useMemo<NextRouter>(
    () => ({
      basePath: "",
      isFallback: false,
      route: url!.pathname,
      pathname: url!.pathname,
      query: Array.from(url!.searchParams.entries()).reduce(
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
      prefetch: (url) => {
        action("router#prefetch")(url);

        return Promise.resolve();
      },
      beforePopState: (cb) => {
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
    }),
    []
  );

  React.useEffect(() => {
    const previousRouter = Router.router;

    Router.router = router as any;

    () => {
      Router.router = previousRouter;
    };
  }, []);

  const headElementMap = React.useMemo(
    () => new Map<string, React.ReactElement>(),
    []
  );
  const _onHeadChange = React.useMemo(
    () => (elements: React.ReactElement[]) => {
      headElementMap.clear();

      for (const element of elements) {
        headElementMap.set(`${element.key}`, element);
      }

      onHeadChange(Array.from(headElementMap.values()));
    },
    []
  );

  return (
    <HeadManagerContext.Provider value={_onHeadChange}>
      <URLContext.Provider value={url}>
        <RouterContext.Provider value={router}>
          <RepositoryContext.Provider value={repositories as any}>
            <LocaleContext.Provider
              value={{ currentLocale, availableLocales, isLoading }}
            >
              {children}
            </LocaleContext.Provider>
          </RepositoryContext.Provider>
        </RouterContext.Provider>
      </URLContext.Provider>
    </HeadManagerContext.Provider>
  );
}

const DEFAULT_CURRENT_LOCALE = "en-US";
const DEFAULT_AVAILABLE_LOCALES = ["en-US", "ja-JP"];
const DEFAULT_IS_LOADING = false;
