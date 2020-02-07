import * as React from "react";
import useLocale from "../../hooks/useLocale";
import useTranslation from "../../hooks/useTranslation";
import useURL from "../../hooks/useURL";

export default function useLoggingPageView(): void {
  const url = useURL();
  const { currentLocale } = useLocale();
  const title = useTranslation("WEBSITE_TITLE");

  React.useEffect(() => {
    if (typeof globalThis.ga === "undefined") return;

    globalThis.ga("set", "location", url.href);
    globalThis.ga("set", "title", title);
    globalThis.ga("send", "pageview");
  }, [currentLocale]);
}
