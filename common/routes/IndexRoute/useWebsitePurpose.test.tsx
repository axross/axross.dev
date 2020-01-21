import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import useWebsitePurpose from "./useWebsitePurpose";

describe("useWebsitePurpose()", () => {
  it("triggers rendering twice with the values [null, true] -> [string, false] after checking the cache, getting the website purpose from API and caching it", async () => {
    const websitePurpose = Symbol();
    const currentLocale: any = Symbol();
    const websitePurposeApi = { getByLocale: jest.fn(() => Promise.resolve(websitePurpose)) };
    const websitePurposeCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebsitePurpose());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeApi, websitePurposeCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([websitePurpose, false]);
    expect(websitePurposeApi.getByLocale).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.has).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.get).not.toHaveBeenCalled();
    expect(websitePurposeCache.set).toHaveBeenCalledWith(currentLocale, websitePurpose);
  });

  it("triggers rendering twice with the values [null, true] -> [null, false] after checking the cache and the API thrown", async () => {
    const currentLocale: any = Symbol();
    const websitePurposeApi = { getByLocale: jest.fn(() => Promise.reject(new Error())) };
    const websitePurposeCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebsitePurpose());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeApi, websitePurposeCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
    expect(websitePurposeApi.getByLocale).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.has).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.get).not.toHaveBeenCalled();
    expect(websitePurposeCache.set).not.toHaveBeenCalled();
  });

  it("triggers rendering once with the values [string, false] after checking the cache and getting the website purpose from the cache", async () => {
    const websitePurpose = Symbol();
    const currentLocale: any = Symbol();
    const websitePurposeApi = { getByLocale: jest.fn() };
    const websitePurposeCache = { has: jest.fn(() => true), get: jest.fn(() => websitePurpose), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebsitePurpose());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeApi, websitePurposeCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(1);
    expect(returnValues[0]).toEqual([websitePurpose, false]);
    expect(websitePurposeApi.getByLocale).not.toHaveBeenCalled();
    expect(websitePurposeCache.has).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.get).toHaveBeenCalledWith(currentLocale);
    expect(websitePurposeCache.set).not.toHaveBeenCalled();
  });  
});
