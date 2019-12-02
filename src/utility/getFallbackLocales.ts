import { NextPageContext } from "next";

export default function getFallbackLocales(context: NextPageContext): string[] {
  let requestedLocales: string[] = [];

  if (context.req) {
    const acceptLanguage = context.req.headers["accept-language"];

    if (acceptLanguage) {
      const parts = acceptLanguage.split(",").map(part => {
        const [locale, priorityString] = part.split(";q=");
        const priority = parseInt(priorityString);

        return {
          locale,
          priority: Number.isNaN(priority) ? Infinity : priority
        };
      });

      parts.sort((a, b) => b.priority - a.priority);

      for (const { locale } of parts) {
        if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(locale)) continue;

        if (locale === "*") continue;

        requestedLocales.push(locale);
      }
    }
  }

  if (typeof navigator !== "undefined") {
    for (const locale of navigator.languages) {
      requestedLocales.push(locale);
    }
  }

  return requestedLocales;
}
