import { renderHook } from "@testing-library/react-hooks";
import {
  useFacebookShare,
  useLinkedinShare,
  useTwitterShare,
} from "./social-share";

describe("useTwitterShare()", () => {
  const originalWindowOpen = globalThis.open;
  const windowOpen = jest.fn();

  beforeAll(() => {
    globalThis.open = windowOpen;
  });

  afterAll(() => {
    globalThis.open = originalWindowOpen;
  });

  it("returns a function to open a new browser tab/window", () => {
    const { result } = renderHook(() =>
      useTwitterShare({
        url: "https://dummy.kohei.dev/path/to/page",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      })
    );

    result.current();

    expect(windowOpen).toHaveBeenCalledTimes(1);
    expect(windowOpen).toHaveBeenCalledWith(
      "https://twitter.com/intent/tweet?url=https%3A%2F%2Fdummy.kohei.dev%2Fpath%2Fto%2Fpage&text=Lorem+ipsum+dolor+sit+amet%2C+consectetur+adipiscing+elit%2C+sed+do+eiusmod+tempor+incididunt+ut+labore+et+dolore+magna+aliqua."
    );
  });
});

describe("useFacebookShare()", () => {
  const originalWindowOpen = globalThis.open;
  const windowOpen = jest.fn();

  beforeAll(() => {
    globalThis.open = windowOpen;
  });

  afterAll(() => {
    globalThis.open = originalWindowOpen;
  });

  it("returns a function to open a new browser tab/window", () => {
    const { result } = renderHook(() =>
      useFacebookShare({
        url: "https://dummy.kohei.dev/path/to/page",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      })
    );

    result.current();

    expect(windowOpen).toHaveBeenCalledTimes(1);
    expect(windowOpen).toHaveBeenCalledWith(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdummy.kohei.dev%2Fpath%2Fto%2Fpage&quote=Lorem+ipsum+dolor+sit+amet%2C+consectetur+adipiscing+elit%2C+sed+do+eiusmod+tempor+incididunt+ut+labore+et+dolore+magna+aliqua."
    );
  });
});

describe("useLinkedinShare()", () => {
  const originalWindowOpen = globalThis.open;
  const windowOpen = jest.fn();

  beforeAll(() => {
    globalThis.open = windowOpen;
  });

  afterAll(() => {
    globalThis.open = originalWindowOpen;
  });

  it("returns a function to open a new browser tab/window", () => {
    const { result } = renderHook(() =>
      useLinkedinShare({ url: "https://dummy.kohei.dev/path/to/page" })
    );

    result.current();

    expect(windowOpen).toHaveBeenCalledTimes(1);
    expect(windowOpen).toHaveBeenCalledWith(
      "https://www.linkedin.com/sharing/share-offsite/?mini=true&url=https%3A%2F%2Fdummy.kohei.dev%2Fpath%2Fto%2Fpage"
    );
  });
});
