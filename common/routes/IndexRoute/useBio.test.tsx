import * as React from "react";
import { act, create } from "react-test-renderer";
import LocaleContext from "../../contexts/LocaleContext";
import useBio from "./useBio";
import RepositoryContext from "../../contexts/RepositoryContext";

describe("useBio()", () => {
  it("calls the given BioRepository#getByLocale() through the context", async () => {
    const bio = Symbol("BIO");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.resolve(bio));

    const Component = () => {
      useBio();

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioRepository: { getByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(getByLocale).toBeCalledWith(currentLocale);
  });

  it("returns values in 2 steps: [null, true] -> [bio, false]", async () => {
    const bio = Symbol("BIO");
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.resolve(bio));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBio());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioRepository: { getByLocale } } as any}>
          <LocaleContext.Provider value={{ currentLocale, availableLocales: [], isLoading: false }}>
            <Component />
          </LocaleContext.Provider>
        </RepositoryContext.Provider>
      );
    });

    expect(returnValues.length).toBe(2);
    expect(returnValues[0]).toEqual([null, true]);
    expect(returnValues[1]).toEqual([bio, false]);
  });

  it("returns values in 2 steps: [null, true] -> [null, false] when the repository threw", async () => {
    const currentLocale: any = Symbol("CURRENT_LOCALE");
    const getByLocale = jest.fn(() => Promise.reject(new Error()));
    const returnValues: any[] = [];

    const Component = () => {
      returnValues.push(useBio());

      return null;
    }

    await act(async () => {
      create(
        <RepositoryContext.Provider value={{ bioRepository: { getByLocale } } as any}>
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
