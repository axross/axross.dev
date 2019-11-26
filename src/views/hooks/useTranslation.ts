import * as React from "react";
import TranslationContext from "../components/TranslationContext";

export default function useTranslation(): Record<string, string> {
  return React.useContext(TranslationContext);
}
