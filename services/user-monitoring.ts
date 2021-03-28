export abstract class UserMonitoringService {
  abstract trackPageView(): void;

  abstract trackUiEvent(actionName: string, value?: number): void;
}

export class EmptyUserMonitoringService implements UserMonitoringService {
  trackPageView(): void {}

  trackUiEvent(_actionName: string, _value?: number): void {}
}

export class BrowserUserMonitoringService implements UserMonitoringService {
  constructor() {
    this.gtag = (globalThis as any).gtag ? (globalThis as any).gtag : () => {};
  }

  private gtag: (...args: any) => {};

  trackPageView(): void {
    if (!globalThis.document) {
      console.warn(
        `gtag("event", "page_view") has been called in a non-browser context. It does nothing.`
      );

      return;
    }

    const url = new URL(globalThis.location.href);
    const title = globalThis.document.title;
    const href = url.href;
    const search = url.searchParams.has("hl")
      ? `?hl=${url.searchParams.get("hl")}`
      : "";

    this.gtag("event", "page_view", {
      page_title: title,
      page_location: href,
      page_path: url.pathname + search,
    });
  }

  trackUiEvent(actionName: string, value?: number): void {
    this.gtag("event", actionName, {
      event_category: "ui_event",
      value: value,
    });
  }
}
