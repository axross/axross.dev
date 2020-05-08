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

describe("useBio()", () => {
  const locale = "LOCALE";
  const bio = Symbol("BIO");
  const isLoading = Symbol("IS_LOADING");
  const getBio = Symbol("GET_BIO");
  const useQuery = jest
    .fn()
    .mockName("useQuery")
    .mockReturnValue({ data: bio, isLoading });

  let useBio: typeof import("./useBio").default;

  beforeAll(async () => {
    jest.mock("react-query", () => ({ useQuery }));

    useBio = (await import("./useBio")).default;
  });

  afterEach(() => {
    useQuery.mockClear();
  });

  it("calls useQuery() with the key, current locale, getBio() and initial data", async () => {
    function Component() {
      useBio();

      return null;
    }

    await act(async () => {
      create(
        <MockApp repositories={{ getBio } as any} currentLocale={locale}>
          <Component />
        </MockApp>
      );
    });

    expect(useQuery).toHaveBeenCalledWith(["bio", { locale }], getBio, {
      initialData: null,
    });
  });

  it("returns [data, isLoading] that are the received values from useQuery()", async () => {
    let returnValue: any;

    function Component() {
      returnValue = useBio();

      return null;
    }

    await act(async () => {
      create(
        <MockApp repositories={{ getBio } as any} currentLocale={locale}>
          <Component />
        </MockApp>
      );
    });

    expect(returnValue).toEqual([bio, isLoading]);
  });
});
