import { useRouter } from "next/router";
import * as React from "react";
import LocaleString from "../../entities/LocaleString";
import Person from "../../entities/Person";
import AvailableLocalesContext from "./AvailableLocalesContext";
import CurrentLocaleContext from "./CurrentLocaleContext";
import MyselfContext from "./MyselfContext";
import SelfUrlContext from "./SelfUrlContext";
import TranslationContext from "./TranslationContext";

export interface Props {
  locale: LocaleString;
  availableLocales: LocaleString[];
  translation: Record<string, string>;
  myself: Person;
}

function Page({
  locale,
  availableLocales,
  translation,
  myself,
  children
}: Props & { children: React.ReactNode }) {
  const router = useRouter();
  const url = new URL(router.asPath, process.env.ORIGIN);

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
