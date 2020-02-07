import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { WEBSITE_TITLE } from "../../dictionary";
import useLocale from "../../hooks/useLocale";
import useURL from "../../hooks/useURL";

export default function useLoggingPageView(): void {
  const url = useURL();
  const { currentLocale } = useLocale();

  React.useEffect(() => {
    if (typeof globalThis.ga === "undefined") return;

    globalThis.ga("set", "location", window.location.href);
    globalThis.ga(
      "set",
      "title",
      new IntlMessageFormat(WEBSITE_TITLE[currentLocale]).format()
    );
    globalThis.ga("send", "pageview");
    globalThis.ga("set", "location", url.href);
  }, [currentLocale]);
}
