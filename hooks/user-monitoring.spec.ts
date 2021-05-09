jest.mock("./router");

import { renderHook } from "@testing-library/react-hooks";
import { useUserMonitoring } from "./user-monitoring";

describe("useUserMonitoring()", () => {
  const originalDocumentTitle: any = globalThis.document.title;
  const originalGtag: unknown = (globalThis as any).gtag;
  const gtag = jest.fn();

  beforeAll(() => {
    (globalThis as any).gtag = gtag;
  });

  afterEach(() => {
    globalThis.document.title = originalDocumentTitle;
    jest.resetAllMocks();
  });

  afterAll(() => {
    (globalThis as any).gtag = originalGtag;
  });

  describe(".trackPageView()", () => {
    it("calls globalThis.gtag() with a page summary", () => {
      (globalThis as any).document.title = "Lorem ipsum";

      const { result } = renderHook(() => useUserMonitoring());

      result.current.trackPageView();

      expect(gtag).toHaveBeenCalledTimes(1);
      expect(gtag).toHaveBeenCalledWith("event", "page_view", {
        page_title: "Lorem ipsum",
        page_location: "https://dummy.kohei.dev/path/to/route",
        page_path: "/path/to/route",
      });
    });
  });

  describe(".trackUiEvent()", () => {
    it("calls globalThis.gtag() with an event summary", () => {
      const { result } = renderHook(() => useUserMonitoring());

      result.current.trackUiEvent("this_is_action_name", 123);

      expect(gtag).toHaveBeenCalledTimes(1);
      expect(gtag).toHaveBeenCalledWith("event", "this_is_action_name", {
        event_category: "ui_event",
        value: 123,
      });
    });
  });
});
