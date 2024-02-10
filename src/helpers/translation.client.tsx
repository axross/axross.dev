"use client";

import { type i18n as I18next, createInstance } from "i18next";
import i18nextHttpBackend from "i18next-http-backend";
import {
  type JSX,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { initReactI18next } from "react-i18next";
import { KnownError, captureException } from "~/helpers/error";
import { availableLocales, fallbackLocale } from "~/helpers/locale";
import { type Translation, fallbackNamespace } from "~/helpers/translation";
import { type Locale } from "~/models/locale";

interface TranslationContextValue {
  locale: Locale;
  i18next: I18next;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

function TranslationProvider({
  locale,
  children,
}: {
  readonly locale: Locale;
  readonly children?: ReactNode;
}): JSX.Element {
  const i18next = useMemo(() => {
    const instance = createInstance()
      .use(initReactI18next)
      .use(i18nextHttpBackend);

    instance.on("failedLoading", (lng, ns, message) => {
      captureException(
        new KnownError(
          "789db4ca",
          `Failed to load i18n dictionary (locale: ${lng}, namespace: ${ns}).`,
          new Error(message)
        )
      );
    });

    void instance.init({
      supportedLngs: availableLocales,
      fallbackLng: fallbackLocale,
      lng: locale,
      fallbackNS: fallbackNamespace,
      defaultNS: fallbackNamespace,
      ns: fallbackNamespace,
      load: "currentOnly",
      backend: {
        loadPath: "/assets/locales/{{lng}}/namespaces/{{ns}}",
        // eslint-disable-next-line max-params
        request: (
          options: never,
          url: string,
          payload: never,
          callback: (error: unknown, response: unknown) => void
        ) => {
          fetch(url, {})
            .then(async (response) => {
              callback(null, {
                status: response.status,
                data: (await response.json()) as never,
              });
            })
            .catch((error) => {
              callback(error, null);
            });
        },
      },
      react: { useSuspense: false },
    });

    return instance;
  }, []);

  const value = useMemo(() => {
    return { locale, i18next };
  }, [locale, i18next]);

  useEffect(() => {
    if (i18next.languages[0] !== locale) {
      void i18next.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

function useTranslation(namespace: string = fallbackNamespace): Translation {
  const translationContextValue = useContext(TranslationContext);

  if (translationContextValue === null) {
    throw new Error(
      "useTranslation() has been called outside <TranslationProvider>. Do not forget to wrap the components with the provider."
    );
  }

  const { locale, i18next } = translationContextValue;

  return {
    t: i18next.getFixedT(locale, namespace),
  };
}

export { TranslationProvider, useTranslation };
