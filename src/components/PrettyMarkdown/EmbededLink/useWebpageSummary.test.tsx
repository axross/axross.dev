import * as React from "react";
import { act, create } from "react-test-renderer";
import MockApp from "../../../../fixtures/MockApp";

describe("useWebpageSummary()", () => {
  const url = Symbol("URL");
  const locale = "LOCALE";
  const webpageSummary = Symbol("WEBPAGE_SUMMARY");
  const isLoading = Symbol("IS_LOADING");
  const getWebpageSummary = Symbol("GET_WEBPAGE_SUMMARY");
  const useQuery = jest.fn()
    .mockName("useQuery")
    .mockReturnValue({ data: webpageSummary, isLoading });

  let useWebpageSummary: typeof import("./useWebpageSummary").default;

  beforeAll(async () => {
    jest.mock("react-query", () => ({ useQuery }));

    useWebpageSummary = (await import("./useWebpageSummary")).default;
  });

  afterEach(() => {
    useQuery.mockClear();
  });

  it("calls useQuery() with the key, current locale, getWebpageSummary() and initial data", async () => {
    function Component() {
      useWebpageSummary({ url } as any);

      return null;
    };

    await act(async () => {
      create(
        <MockApp
          repositories={{ getWebpageSummary } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(useQuery).toHaveBeenCalledWith(["webpage-summary", { url }], getWebpageSummary, { initialData: null });
  });

  it("returns [data, isLoading] that are the received values from useQuery()", async () => {
    let returnValue: any;

    function Component() {
      returnValue = useWebpageSummary({ url } as any);

      return null;
    };

    await act(async () => {
      create(
        <MockApp
        repositories={{ getWebpageSummary } as any}
          currentLocale={locale}
        >
          <Component />
        </MockApp>
      );
    });

    expect(returnValue).toEqual([webpageSummary, isLoading]);
  });
});
