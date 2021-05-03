import { NextRouter, useRouter as useOriginalRouter } from "next/router";
import * as React from "react";
import { getDefaultLocale, getLocales } from "../helpers/localization";

interface ExtendedRouter
  extends Omit<NextRouter, "defaultLocale" | "locale" | "locales"> {
  // override
  defaultLocale: NonNullable<NextRouter["defaultLocale"]>;
  locale: NonNullable<NextRouter["locale"]>;
  locales: NonNullable<NextRouter["locales"]>[0][];

  //
  url: URL;
  alternativeLocales: NonNullable<NextRouter["locales"]>[0][];
}

export function useRouter(): ExtendedRouter {
  const originalRouter = useOriginalRouter();
  const router: ExtendedRouter = React.useMemo(() => {
    const locales = getLocales();
    const locale =
      (originalRouter.query.locale as string | undefined) ?? getDefaultLocale();
    const url = new URL(
      originalRouter.asPath,
      process.env.NEXT_PUBLIC_SELF_ORIGIN
    );

    return {
      ...originalRouter,
      locale,
      locales,
      defaultLocale: getDefaultLocale(),
      alternativeLocales: locales.filter((l) => l !== locale),
      url,
    };
  }, [originalRouter]);

  return router;
}
