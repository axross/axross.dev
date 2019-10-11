import * as React from "react";
import LocaleString from "../../entities/LocaleString";
import AvailableLocalesContext from "../components/AvailableLocalesContext";

function useAvailableLocales(): LocaleString[] {
  return React.useContext(AvailableLocalesContext);
}

export default useAvailableLocales;
