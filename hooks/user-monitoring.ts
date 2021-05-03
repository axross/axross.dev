import * as React from "react";
import { useRouter } from "./router";

const gtag = (globalThis as any).gtag ? (globalThis as any).gtag : () => {};

export function useUserMonitoring() {
  const { url } = useRouter();

  const trackPageView = React.useCallback(() => {
    if (!globalThis.document) {
      console.warn(
        `gtag("event", "page_view") has been called in a non-browser context. It does nothing.`
      );

      return;
    }

    const title = globalThis.document.title;
    const href = url.href;

    gtag("event", "page_view", {
      page_title: title,
      page_location: href,
      page_path: url.pathname,
    });
  }, []);

  const trackUiEvent = React.useCallback(
    (actionName: string, value?: number) => {
      if (!globalThis.document) {
        console.warn(
          `gtag("event", "page_view") has been called in a non-browser context. It does nothing.`
        );

        return;
      }

      gtag("event", actionName, {
        event_category: "ui_event",
        value: value,
      });
    },
    []
  );

  return { trackPageView, trackUiEvent };
}
