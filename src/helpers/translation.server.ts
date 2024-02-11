import "server-only";

import {
  type Resource as I18nResource,
  type i18n as I18next,
  createInstance,
} from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { resolveRequestedLocale } from "~/helpers/header";
import { availableLocales, fallbackLocale } from "~/helpers/locale";
import { type Translation, fallbackNamespace } from "~/helpers/translation";
import { type Locale } from "~/models/locale";

function importDictionary(
  locale: string,
  namespace: string,
): Promise<I18nResource> {
  return import(`../locales/${locale}/${namespace}.json`) as never;
}

async function createI18next({
  locale,
  namespace,
}: {
  locale: Locale;
  namespace: string;
}): Promise<I18next> {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend(importDictionary))
    .init({
      supportedLngs: availableLocales,
      fallbackLng: fallbackLocale,
      lng: locale,
      fallbackNS: fallbackNamespace,
      defaultNS: fallbackNamespace,
      ns: namespace,
    });

  return i18nInstance;
}

async function getTranslation(
  namespace = fallbackNamespace,
): Promise<Translation> {
  const locale = resolveRequestedLocale();
  const i18next = await createI18next({ locale, namespace });

  return {
    // eslint-disable-next-line id-length
    t: i18next.getFixedT(locale, namespace),
  };
}

export { getTranslation };
