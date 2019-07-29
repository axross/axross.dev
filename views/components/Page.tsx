import { useRouter } from "next/router";
import * as React from "react";
import { AVAILABLE_LOCALES } from "../../constant/locale";
import LocaleString from "../../entities/LocaleString";
import Person from "../../entities/Person";
import enUsTranslation from "../../translations/en-US";
import jaJpTranslation from "../../translations/ja-JP";
import AvailableLocalesContext from "./AvailableLocalesContext";
import CurrentLocaleContext from "./CurrentLocaleContext";
import MyselfContext from "./MyselfContext";
import SelfUrlContext from "./SelfUrlContext";
import TranslationContext from "./TranslationContext";

export interface Props {
  myself: Person;
  locale: LocaleString;
  availableLocales?: LocaleString[];
  origin: string;
}

function Page({
  myself,
  locale,
  availableLocales = AVAILABLE_LOCALES,
  origin,
  children
}: Props & { children: React.ReactNode }) {
  const router = useRouter();
  const url = new URL(router.asPath, origin);
  const translation = locale === "ja-JP" ? jaJpTranslation : enUsTranslation;

  return (
    <SelfUrlContext.Provider value={url}>
      <MyselfContext.Provider value={myself}>
        <AvailableLocalesContext.Provider value={availableLocales}>
          <CurrentLocaleContext.Provider value={locale}>
            <TranslationContext.Provider value={translation}>
              {children}
            </TranslationContext.Provider>
          </CurrentLocaleContext.Provider>
        </AvailableLocalesContext.Provider>
      </MyselfContext.Provider>
    </SelfUrlContext.Provider>
  );
}

export default Page;
