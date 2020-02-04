import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../../contexts/LocaleContext";
import RepositoryContext from "../../../contexts/RepositoryContext";
import useBio from "./useBio";

describe("useBio()", () => {
  it("triggers rendering twice with the values [null, true] -> [string, false] after checking the cache, getting the bio from API and caching it", async () => {
    const bio = Symbol();
    const currentLocale: any = Symbol();
    const bioApi = { getByLocale: jest.fn(() => Promise.resolve(bio)) };
    const bioCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBio());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioApi, bioCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([bio, false]);
    expect(bioApi.getByLocale).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.has).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.get).not.toHaveBeenCalled();
    expect(bioCache.set).toHaveBeenCalledWith(currentLocale, bio);
  });

  it("triggers rendering twice with the values [null, true] -> [null, false] after checking the cache and the API thrown", async () => {
    const currentLocale: any = Symbol();
    const bioApi = { getByLocale: jest.fn(() => Promise.reject(new Error())) };
    const bioCache = { has: jest.fn(() => false), get: jest.fn(), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBio());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioApi, bioCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
    expect(bioApi.getByLocale).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.has).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.get).not.toHaveBeenCalled();
    expect(bioCache.set).not.toHaveBeenCalled();
  });

  it("triggers rendering once with the values [string, false] after checking the cache and getting the bio from the cache", async () => {
    const bio = Symbol();
    const currentLocale: any = Symbol();
    const bioApi = { getByLocale: jest.fn() };
    const bioCache = { has: jest.fn(() => true), get: jest.fn(() => bio), set: jest.fn() };
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBio());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioApi, bioCache } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(1);
    expect(returnValues[0]).toEqual([bio, false]);
    expect(bioApi.getByLocale).not.toHaveBeenCalled();
    expect(bioCache.has).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.get).toHaveBeenCalledWith(currentLocale);
    expect(bioCache.set).not.toHaveBeenCalled();
  });  
});
