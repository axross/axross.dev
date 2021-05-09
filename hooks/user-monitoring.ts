import * as React from "react";
import { useRouter } from "./router";

export function useUserMonitoring() {
  const { url } = useRouter();

  const trackPageView = React.useCallback(() => {
    const gtag = (globalThis as any).gtag ? (globalThis as any).gtag : () => {};

    if (!globalThis.document) {
      console.warn(
        `gtag("event", "page_view") has been called in a non-browser context. It does nothing.`
      );

      return;
    }

    gtag("event", "page_view", {
      page_title: globalThis.document.title,
      page_location: url.href,
      page_path: url.pathname,
    });
  }, []);

  const trackUiEvent = React.useCallback((action: string, value?: number) => {
    const gtag = (globalThis as any).gtag ? (globalThis as any).gtag : () => {};

    if (!globalThis.document) {
      console.warn(
        `gtag("event", "page_view") has been called in a non-browser context. It does nothing.`
      );

      return;
    }

    gtag("event", action, {
      event_category: "ui_event",
      value: value,
    });
  }, []);

  return { trackPageView, trackUiEvent };
}
