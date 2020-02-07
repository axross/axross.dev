import * as React from "react";
import { act, create } from "react-test-renderer";
import { LocaleContext } from "./useLocale";

describe("useTranslation()", () => {
  const locale: any = Symbol("LOCALE");
  const dictionaryKey: any = Symbol("DICTIONARY_KEY");
  const dictionaryValue: any = Symbol("DICTIONARY_VALUE");
  const formatReturnValue: any = Symbol("FORMAT_RETURN_VALUE");
  const IntlMessageFormat = jest.fn()
    .mockName("IntlMessageFormat")
    // must use .mockImplementation() for return value of new Xxx().
    .mockImplementation(() => ({ format }));
  const format = jest.fn()
    .mockName("IntlMessageFormat#format")
    .mockReturnValue(formatReturnValue);
  let useTranslation: typeof import("./useTranslation")["default"];

  beforeAll(async () => {
    jest.mock("intl-messageformat", () => IntlMessageFormat);
    jest.mock("../dictionary", () => ({
      [dictionaryKey]: {
        [locale]: dictionaryValue,
      }
    }));

    useTranslation = (await import("./useTranslation")).default;
  });

  afterEach(() => {
    IntlMessageFormat.mockClear();
    format.mockClear();
  });

  describe("when the specified dictionary entry is found", () => {
    it("uses IntlMessageFormat to build messages", async () => {
      
      function Component() {
        useTranslation(dictionaryKey);

        return null;
      }

      await act(async () => {
        create(
          <LocaleContext.Provider value={{ currentLocale: locale } as any}>
            <Component />
          </LocaleContext.Provider>
        );
      });

      expect(IntlMessageFormat).toHaveBeenCalledWith(dictionaryValue);
    });

    it("passes the given arguments to IntlMessageFormat#format()", async () => {
      const args = { arg1: Symbol("ARG_1"), arg2: Symbol("ARG_2") }
      
      function Component() {
        useTranslation(dictionaryKey, args);

        return null;
      }

      await act(async () => {
        create(
          <LocaleContext.Provider value={{ currentLocale: locale } as any}>
            <Component />
          </LocaleContext.Provider>
        );
      });

      expect(format).toHaveBeenCalledWith(args);
    });

    it("returns the formated messages", async () => {
      let returnedValue;

      function Component() {
        returnedValue = useTranslation(dictionaryKey);

        return null;
      }

      await act(async () => {
        create(
          <LocaleContext.Provider value={{ currentLocale: locale } as any}>
            <Component />
          </LocaleContext.Provider>
        );
      });

      expect(returnedValue).toBe(formatReturnValue);
    });
  });

  describe("when the dictionary doesn't have the specified entry", () => {
    it("throws an error", async () => {
      expect.assertions(1);

      const anotherDictionaryKey: any = Symbol("ANOTHER_DICTIONARY_KEY");
      
      function Component() {
        expect(() => useTranslation(anotherDictionaryKey)).toThrow();

        return null;
      }

      await act(async () => {
        create(
          <LocaleContext.Provider value={{ currentLocale: locale } as any}>
            <Component />
          </LocaleContext.Provider>
        );
      });
    });
  });

  describe("when the dictionary entry doesn't have an entry for the current locale", () => {
    it("throws an error", async () => {
      expect.assertions(1);

      const anotherLocale: any = Symbol("ANOTHER_LOCALE");
      
      function Component() {
        expect(() => useTranslation(dictionaryKey)).toThrow();

        return null;
      }

      await act(async () => {
        create(
          <LocaleContext.Provider value={{ currentLocale: anotherLocale } as any}>
            <Component />
          </LocaleContext.Provider>
        );
      });
    });
  });
});
