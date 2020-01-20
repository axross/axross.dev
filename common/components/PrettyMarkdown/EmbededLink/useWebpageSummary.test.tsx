import * as React from "react";
import { act, create } from "react-test-renderer";
import RepositoryContext from "../../../contexts/RepositoryContext";
import useWebpageSummary from "./useWebpageSummary";

describe("useWebpageSummary()", () => {
  it("calls the given WebpageSummaryRepository#getByURL() through the context", async () => {
    const webpageSummary = Symbol("WEBPAGE_SUMMARY");
    const url: any = Symbol("URL");
    const getByURL = jest.fn(() => Promise.resolve(webpageSummary));

    const Component = () => {
      useWebpageSummary(url);

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ webpageSummaryRepository: { getByURL } } as any}>
          <Component />
        </RepositoryContext.Provider>
      );
    });

    expect(getByURL).toBeCalledWith(url);
  });

  it("returns values in 2 steps: [null, true] -> [webpageSummary, false]", async () => {
    const webpageSummary = Symbol("WEBPAGE_SUMMARY");
    const url: any = Symbol("URL");
    const getByURL = jest.fn(() => Promise.resolve(webpageSummary));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebpageSummary(url));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ webpageSummaryRepository: { getByURL } } as any}>
          <Component />
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([webpageSummary, false]);
  });

  it("returns values in 2 steps: [null, true] -> [null, false] when the repository threw", async () => {
    const url: any = Symbol("URL");
    const getByURL = jest.fn(() => Promise.reject(new Error()));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebpageSummary(url));

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ webpageSummaryRepository: { getByURL } } as any}>
          <Component />
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
  });
});
