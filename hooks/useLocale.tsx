import * as React from "react";
import LocaleString from "../entities/LocaleString";

interface Locales {
  currentLocale: LocaleString;
  availableLocales: LocaleString[];
  isLoading: boolean;
}

export const LocaleContext = React.createContext<Locales>(null as any);

export default function useLocale(): Locales {
  return React.useContext(LocaleContext);
}
