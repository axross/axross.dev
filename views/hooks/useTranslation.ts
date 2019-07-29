import * as React from "react";
import Translation from "../../translations/Translation";
import TranslationContext from "../components/TranslationContext";

function useTranslation(): Translation {
  return React.useContext(TranslationContext);
}

export default useTranslation;
