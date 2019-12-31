import * as React from "react";
import LocaleString from "../../common/entities/LocaleString";

interface LocaleContextData {
  currentLocale: LocaleString;
  availableLocales: LocaleString[];
  isLoading: boolean;
}

export default React.createContext<LocaleContextData>(null as any);
