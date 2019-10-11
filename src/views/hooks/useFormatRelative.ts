import formatRelative from "../utility/formatRelative";
import useCurrentLocale from "./useCurrentLocale";

type FormatRelative = (date: Date) => string;

function useFormatRelative(): FormatRelative {
  const locale = useCurrentLocale();

  return date => formatRelative(date, locale);
}

export default useFormatRelative;
