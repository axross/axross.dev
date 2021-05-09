jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/path/to/[route]",
    asPath: "/path/to/route",
    query: { locale: "ja-jp" },
  }),
}));

import { renderHook } from "@testing-library/react-hooks";
import { useRouter } from "./router";

describe("useRouter()", () => {
  it("returns properties and methods of the base router", () => {
    const { result } = renderHook(() => useRouter());

    expect(result.current.pathname).toBe("/path/to/[route]");
    expect(result.current.asPath).toBe("/path/to/route");
    expect(result.current.query).toEqual({ locale: "ja-jp" });
  });

  it("returns static locale, locales, defaultLocale and alternativeLocales", () => {
    const { result } = renderHook(() => useRouter());

    expect(result.current.locale).toBe("ja-jp");
    expect(result.current.locales).toEqual(["en-us", "ja-jp"]);
    expect(result.current.defaultLocale).toBe("en-us");
    expect(result.current.alternativeLocales).toEqual(["en-us"]);
  });

  it("returns url", () => {
    const { result } = renderHook(() => useRouter());

    expect(result.current.url.href).toBe(
      `${process.env.NEXT_PUBLIC_SELF_ORIGIN}/path/to/route`
    );
  });
});
