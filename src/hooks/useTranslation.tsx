import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import dictionary from "../dictionary";
import useLocale from "./useLocale";

export default function useTranslation(key: string, args?: Record<string, any>): string {
  const { currentLocale } = useLocale();

  return React.useMemo(() => {
    if (!dictionary[key]) throw new Error(`translation (key: ${key}, locale: ${currentLocale}) is not found.`);
    if (!dictionary[key][currentLocale]) throw new Error(`translation (key: ${key}, locale: ${currentLocale}) is not found.`);

    return new IntlMessageFormat(dictionary[key][currentLocale]).format(args);
  }, [key, currentLocale]);
}
