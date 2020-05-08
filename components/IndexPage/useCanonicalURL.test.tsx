import {
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import * as React from "react";
import { act, create } from "react-test-renderer";

describe("useCanonicalURL()", () => {
  const url = new URL("https://tests.kohei.dev/useCanonicalURL?test");
  const useURL = jest.fn().mockName("useURL").mockReturnValue(url);

  beforeAll(() => {
    jest.mock("../../hooks/useURL", () => useURL);
  });

  afterEach(() => {
    useURL.mockClear();
  });

  it("retrieves the URL via URL Context", async () => {
    const useCanonicalURL = (await import("./useCanonicalURL")).default;

    function Component() {
      useCanonicalURL();

      return null;
    }

    await act(async () => {
      create(<Component />);
    });

    expect(useURL).toHaveBeenCalled();
  });

  it("returns an URL that is different reference from the Context's URL", async () => {
    const useCanonicalURL = (await import("./useCanonicalURL")).default;
    let returnedURL: URL;

    function Component() {
      returnedURL = useCanonicalURL();

      return null;
    }

    await act(async () => {
      create(<Component />);
    });

    expect(returnedURL!).not.toBe(url);
  });
});
