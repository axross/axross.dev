import * as React from "react";
import LocaleString from "../../entities/LocaleString";

interface LocaleContextData {
  currentLocale: LocaleString;
  availableLocales: LocaleString[];
}

export default React.createContext<LocaleContextData>(undefined as any);
