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
import MockApp from "../../fixtures/MockApp";

describe("useWebsitePurpose()", () => {
  const locale = "LOCALE";
  const websitePurpose = Symbol("WEBSITE_PURPOSE");
  const isLoading = Symbol("IS_LOADING");
  const getWebsitePurpose = Symbol("GET_WEBSITE_PURPOSE");
  const useQuery = jest
    .fn()
    .mockName("useQuery")
    .mockReturnValue({ data: websitePurpose, isLoading });

  let useWebsitePurpose: typeof import("./useWebsitePurpose").default;

  beforeAll(async () => {
    jest.mock("react-query", () => ({ useQuery }));

    useWebsitePurpose = (await import("./useWebsitePurpose")).default;
  });

  afterEach(() => {
    useQuery.mockClear();
  });

  it("calls useQuery() with the key, current locale, getWebsitePurpose() and initial data", async () => {
    function Component() {
      useWebsitePurpose();

      return null;
    }

    await act(async () => {
      create(
        <MockApp
          repositories={{ getWebsitePurpose } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(useQuery).toHaveBeenCalledWith(
      ["website-purpose", { locale }],
      getWebsitePurpose,
      { initialData: null }
    );
  });

  it("returns [data, isLoading] that are the received values from useQuery()", async () => {
    let returnValue: any;

    function Component() {
      returnValue = useWebsitePurpose();

      return null;
    }

    await act(async () => {
      create(
        <MockApp
          repositories={{ getWebsitePurpose } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(returnValue).toEqual([websitePurpose, isLoading]);
  });
});
