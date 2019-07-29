import * as React from "react";
import TranslationContext from "../components/TranslationContext";

function useTranslation(): Record<string, string> {
  return React.useContext(TranslationContext);
}

export default useTranslation;
