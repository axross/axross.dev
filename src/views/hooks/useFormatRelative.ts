import formatRelative from "../utility/formatRelative";
import useCurrentLocale from "./useCurrentLocale";

type FormatRelative = (date: Date) => string;

export default function useFormatRelative(): FormatRelative {
  const locale = useCurrentLocale();

  return date => formatRelative(date, locale);
}
