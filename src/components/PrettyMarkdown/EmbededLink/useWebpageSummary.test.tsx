import * as React from "react";
import { act, create } from "react-test-renderer";
import { RepositoryContext } from "../../../hooks/useRepository";
import useWebpageSummary from "./useWebpageSummary";

describe("useWebpageSummary()", () => {
  it("triggers rendering twice with the values [null, true] -> [WebpageSummary, false] after getting the blog posts from API", async () => {
    const webpageSummary = Symbol();
    const url: any = Symbol();
    const webpageSummaryApi = { getByURL: jest.fn(() => Promise.resolve(webpageSummary)) };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebpageSummary(url));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ webpageSummaryApi } as any}>
          <Component />
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([webpageSummary, false]);
    expect(webpageSummaryApi.getByURL).toHaveBeenCalledWith(url);
  });

  it("triggers rendering twice with the values [null, true] -> [null, false] after the API thrown", async () => {
    const url: any = Symbol();
    const webpageSummaryApi = { getByURL: jest.fn(() => Promise.reject(new Error())) };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebpageSummary(url));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ webpageSummaryApi } as any}>
          <Component />
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
    expect(webpageSummaryApi.getByURL).toHaveBeenCalledWith(url);
  });
});
