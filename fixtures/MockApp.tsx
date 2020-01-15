import { action } from "@storybook/addon-actions";
import * as React from "react";
import { MemoryRouter, useHistory } from "react-router-dom";
import LocaleContext from "../common/contexts/LocaleContext";
import LocaleString from "../common/entities/LocaleString";

interface Props {
  currentLocale?: LocaleString;
  availableLocales?: LocaleString[];
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function MockApp({ currentLocale = DEFAULT_CURRENT_LOCALE, availableLocales = DEFAULT_AVAILABLE_LOCALES, isLoading = DEFAULT_IS_LOADING, children }: Props) {
  return (
    <LocaleContext.Provider value={{ currentLocale, availableLocales, isLoading }}>
      <MemoryRouter>
        <MockAppInner>
          {children}
        </MockAppInner>
      </MemoryRouter>
    </LocaleContext.Provider>
  );
}

const DEFAULT_CURRENT_LOCALE = "en-US";
const DEFAULT_AVAILABLE_LOCALES = ["en-US", "ja-JP"];
const DEFAULT_IS_LOADING = false;

function MockAppInner({ children }: { children: React.ReactNode }) {
  const history = useHistory();

  React.useEffect(() => {
    const unsubscribe = history.listen((loc, act) => action("history change")(act, history.createHref(loc)));

    return unsubscribe;
  }, []);

  return <>{children}</>;
}
