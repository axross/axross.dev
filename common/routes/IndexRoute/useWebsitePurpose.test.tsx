import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import useWebsitePurpose from "./useWebsitePurpose";

describe("useWebsitePurpose()", () => {
  it("calls the given WebsitePurposeRepository#getByLocale() through the context", async () => {
    const websitePurpose = Symbol("WEBSITE_PURPOSE");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.resolve(websitePurpose));

    const Component = () => {
      useWebsitePurpose();

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeRepository: { getByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(getByLocale).toBeCalledWith(currentLocale);
  });

  it("returns values in 2 steps: [null, true] -> [websitePurpose, false]", async () => {
    const websitePurpose = Symbol("WEBSITE_PURPOSE");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.resolve(websitePurpose));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebsitePurpose());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeRepository: { getByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([websitePurpose, false]);
  });

  it("returns values in 2 steps: [null, true] -> [null, false] when the repository threw", async () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.reject(new Error()));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useWebsitePurpose());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ websitePurposeRepository: { getByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([null, false]);
  });
});
