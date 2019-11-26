import * as React from "react";
import LocaleString from "../../entities/LocaleString";
import AvailableLocalesContext from "../components/AvailableLocalesContext";

export default function useAvailableLocales(): LocaleString[] {
  return React.useContext(AvailableLocalesContext);
}
