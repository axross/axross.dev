import { formatRelative as fr, Locale } from "date-fns";
import enUs from "date-fns/locale/en-US";
import ja from "date-fns/locale/ja";
import LocaleString from "../../entities/LocaleString";

export default function formatRelative(date: Date, locale: LocaleString) {
  return fr(date, new Date(), { locale: LOCALES[locale] });
}

const LOCALES: Record<LocaleString, Locale> = {
  "en-US": enUs,
  "ja-JP": ja
};
