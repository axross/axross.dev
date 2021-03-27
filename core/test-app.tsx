import { NextRouter } from "next/dist/next-server/lib/router/router";
import mitt from "next/dist/next-server/lib/mitt";
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

export interface TestAppImperativeHandle {
  emulateRouteChangeStart: (...args: any[]) => void;
  emulateRouteChangeComplete: (...args: any[]) => void;
  emulateRouteChangeError: (...args: any[]) => void;
  emulateBeforeHistoryChange: (...args: any[]) => void;
  emulateHashChangeStart: (...args: any[]) => void;
  emulateHashChangeComplete: (...args: any[]) => void;
}

export type TestAppElement = TestAppImperativeHandle;

export const TestApp = React.forwardRef<
  TestAppElement,
  React.PropsWithChildren<TestAppProps>
>(
  (
    {
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
    },
    ref
  ) => {
    const nextRouterMockMutRef = React.useRef<NextRouter>();
    const nextRouterMock = React.useMemo(() => {
      if (!nextRouterMockMutRef.current) {
        const events = mitt();
        nextRouterMockMutRef.current = {
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
          events,
          isLocaleDomain: false,
          isFallback: false,
          isReady: true,
          isPreview: false,
        };
      }

      return nextRouterMockMutRef.current;
    }, [
      pathname,
      query,
      asPath,
      push,
      replace,
      prefetch,
      beforePopState,
      back,
      reload,
    ]);

    React.useImperativeHandle<TestAppImperativeHandle, TestAppImperativeHandle>(
      ref,
      () => ({
        emulateRouteChangeStart: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "routeChangeStart",
            ...args
          ),
        emulateRouteChangeComplete: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "routeChangeComplete",
            ...args
          ),
        emulateRouteChangeError: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "routeChangeError",
            ...args
          ),
        emulateBeforeHistoryChange: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "beforeHistoryChange",
            ...args
          ),
        emulateHashChangeStart: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "hashChangeStart",
            ...args
          ),
        emulateHashChangeComplete: (...args: any[]) =>
          nextRouterMockMutRef?.current?.events.emit(
            "hashChangeComplete",
            ...args
          ),
      }),
      []
    );

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
  }
);
