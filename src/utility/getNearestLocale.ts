import LocaleString from "../entities/LocaleString";

export default function getNearestLocale(
  requestedLocales: string[],
  availableLocales: LocaleString[]
): LocaleString | null {
  for (const requestedLocale of requestedLocales) {
    for (const availableLocale of availableLocales) {
      if (requestedLocale === availableLocale) return availableLocale;
      if (requestedLocale.substring(0, 2) === availableLocale.substring(0, 2))
        return availableLocale;
    }
  }

  return null;
}
