import NextApp, { AppContext } from "next/app";
import Head from "next/head";
import * as React from "react";
import { ThemedColor } from "../entities/ColorTheme";
import LocaleString from "../entities/LocaleString";
import {
  getDefaultLocale,
  getAllAvailableLocales
} from "../repositories/localeRepository";
import getTranslation from "../repositories/translationRepository";
import { NO_LOCALE_FALLBACK_PATHS, NO_LOCALE_MATTER_PATHS } from "../settings";
import getFallbackLocales from "../utility/getFallbackLocales";
import getNearestLocale from "../utility/getNearestLocale";
import getQueriedlocale from "../utility/getQueriedLocale";
import getURL from "../utility/getURL";
import respondNotFound from "../utility/respondNotFound";
import respondRedirection from "../utility/respondRedirection";
import setContentSecurityPolicy from "../utility/setContentSecurityPolicy";
import GlobalStyle from "../views/components/GlobalStyle";
import { DARK, LIGHT } from "../views/constant/color";
import LocaleSwitchContext from "../views/contexts/LocaleContext";
import SelfUrlContext from "../views/contexts/SelfUrlContext";
import TranslationContext from "../views/contexts/TranslationContext";
import ColorThemeContext from "../views/components/ColorThemeContext";

export interface GlobalPageProps {
  url: URL;
  availableLocales: LocaleString[];
  currentLocale: LocaleString;
  translation: Record<string, string>;
}

interface Props {
  pageProps: any & GlobalPageProps;
  url: string;
  availableLocales: LocaleString[];
  currentLocale: LocaleString;
  translation: Record<string, string>;
}

interface State {
  isDarkMode: boolean;
}

export default class App extends NextApp<Props, State> {
  public state = {
    isDarkMode: false
  };

  private colorScehemeMediaQuery?: MediaQueryList;
  private colorScehemeMediaQueryListener?: (e: MediaQueryListEvent) => void;

  componentDidMount() {
    this.colorScehemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    this.colorScehemeMediaQueryListener = e => {
      this.setState({ isDarkMode: e.matches });
    };
    this.colorScehemeMediaQuery.addEventListener(
      "change",
      this.colorScehemeMediaQueryListener
    );

    this.setState({
      isDarkMode: this.colorScehemeMediaQuery.matches
    });
  }

  componentWillUnmount() {
    this.colorScehemeMediaQuery?.removeEventListener(
      "change",
      this.colorScehemeMediaQueryListener ?? (() => {})
    );
  }

  render() {
    const {
      pageProps,
      Component,
      availableLocales,
      currentLocale,
      translation,
      url
    } = this.props;
    const colorTheme = this.state.isDarkMode ? DARK : LIGHT;

    return (
      <ColorThemeContext.Provider value={colorTheme}>
        <GlobalStyle />

        <Head>
          <meta
            name="theme-color"
            content={colorTheme[ThemedColor.background]}
            key="themeColor"
          />
        </Head>

        <SelfUrlContext.Provider value={new URL(url)}>
          <LocaleSwitchContext.Provider
            value={{
              currentLocale,
              availableLocales
            }}
          >
            <TranslationContext.Provider value={translation}>
              <Component
                url={new URL(url)}
                availableLocales={availableLocales}
                currentLocale={currentLocale}
                translation={translation}
                {...pageProps}
              />
            </TranslationContext.Provider>
          </LocaleSwitchContext.Provider>
        </SelfUrlContext.Provider>
      </ColorThemeContext.Provider>
    );
  }

  static async getInitialProps({ Component, ctx: context }: AppContext) {
    const url = getURL(context);
    const [availableLocales, defaultLocale] = await Promise.all([
      getAllAvailableLocales(),
      getDefaultLocale()
    ]);
    let currentLocale: LocaleString | null;

    if (NO_LOCALE_MATTER_PATHS.has(url.pathname)) {
      currentLocale = defaultLocale;
    } else {
      const queriedLocale = getQueriedlocale(context);
      const fallbackLocales = getFallbackLocales(context);
      const nearestQueriedLocale = getNearestLocale(
        queriedLocale ? [queriedLocale] : [],
        availableLocales
      );
      const nearestFallbackLocale = getNearestLocale(
        fallbackLocales,
        availableLocales
      );

      if (NO_LOCALE_FALLBACK_PATHS.has(url.pathname)) {
        if (nearestQueriedLocale === null) {
          respondNotFound(context);

          return {} as any;
        }

        if (queriedLocale === null || queriedLocale !== nearestQueriedLocale) {
          const redirectURL = new URL(url.href);

          redirectURL.searchParams.set("hl", nearestQueriedLocale);

          respondRedirection(redirectURL, context);

          return {} as any;
        }
      }

      if (queriedLocale === null || queriedLocale !== nearestQueriedLocale) {
        const redirectURL = new URL(url.href);

        redirectURL.searchParams.set(
          "hl",
          nearestQueriedLocale ?? nearestFallbackLocale ?? defaultLocale
        );

        respondRedirection(redirectURL, context);

        return {} as any;
      }

      currentLocale = queriedLocale;
    }

    if (context.res) {
      setContentSecurityPolicy(context);
    }

    const componentGetInitialProps =
      (Component.getInitialProps as any) || (() => Promise.resolve());
    const translation = await getTranslation(currentLocale);
    const pageProps = await componentGetInitialProps(context, {
      availableLocales,
      currentLocale,
      translation,
      url
    });

    return {
      pageProps,
      availableLocales: pageProps.availableLocales ?? availableLocales,
      currentLocale,
      translation,
      url: url.href
    };
  }
}
