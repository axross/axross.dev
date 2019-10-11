import * as React from "react";
import LocaleString from "../../entities/LocaleString";
import CurrentLocaleContext from "../components/CurrentLocaleContext";

function useCurrentLocale(): LocaleString {
  return React.useContext(CurrentLocaleContext);
}

export default useCurrentLocale;
