import {
  getBestMatchedLocaleFromLanguageRange,
  getBestMatchedLocaleOrFallbackFromLanguageRange,
  getLocaleFromQuery,
  getLocaleFromQueryWithFallback,
} from "./i18n";

describe("getLocaleFromQuery()", () => {
  it("returns a locale from the given search params if it's supported", () => {
    expect(getLocaleFromQuery({ hl: "en-US" })).toBe("en-US");
    expect(getLocaleFromQuery({ hl: "ja-JP" })).toBe("ja-JP");
  });

  it("returns null if the locale in search params is not supported", () => {
    expect(getLocaleFromQuery({ hl: "en-GB" })).toBeNull();
    expect(getLocaleFromQuery({ hl: "en" })).toBeNull();
    expect(getLocaleFromQuery({ hl: "fr-FR" })).toBeNull();
  });
});

describe("getLocaleFromQueryWithFallback()", () => {
  it("returns a locale from the given search params if it's supported", () => {
    expect(getLocaleFromQueryWithFallback({ hl: "en-US" })).toBe("en-US");
    expect(getLocaleFromQueryWithFallback({ hl: "ja-JP" })).toBe("ja-JP");
  });

  it('returns "en-US" if the locale in search params is not supported', () => {
    expect(getLocaleFromQueryWithFallback({ hl: "en-GB" })).toBe("en-US");
    expect(getLocaleFromQueryWithFallback({ hl: "en" })).toBe("en-US");
    expect(getLocaleFromQueryWithFallback({ hl: "fr-FR" })).toBe("en-US");
  });
});

describe("function getBestMatchedLocaleFromLanguageRange()", () => {
  it("returns the best matched locale from the given language range", () => {
    expect(
      getBestMatchedLocaleFromLanguageRange(
        "en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8"
      )
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleFromLanguageRange("en-GB,fr-CA;q=0.7,en;q=0.8")
    ).toBe("en-US");
    expect(getBestMatchedLocaleFromLanguageRange("fr-CA;q=0.7,en;q=0.8")).toBe(
      "en-US"
    );
    expect(
      getBestMatchedLocaleFromLanguageRange("en,ja-JP;q=0.9,fr-CA;q=0.7")
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleFromLanguageRange("en;q=0.8,ja-JP;q=0.9,fr-CA;q=0.7")
    ).toBe("ja-JP");
  });

  it("returns null if nothing matched from the given language range", () => {
    expect(getBestMatchedLocaleFromLanguageRange("fr-CA;q=0.7")).toBe(null);
  });
});

describe("getBestMatchedLocaleOrFallbackFromLanguageRange()", () => {
  it("returns the best matched locale from the given language range", () => {
    expect(
      getBestMatchedLocaleOrFallbackFromLanguageRange(
        "en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8"
      )
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleOrFallbackFromLanguageRange(
        "en-GB,fr-CA;q=0.7,en;q=0.8"
      )
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleOrFallbackFromLanguageRange("fr-CA;q=0.7,en;q=0.8")
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleOrFallbackFromLanguageRange(
        "en,ja-JP;q=0.9,fr-CA;q=0.7"
      )
    ).toBe("en-US");
    expect(
      getBestMatchedLocaleOrFallbackFromLanguageRange(
        "en;q=0.8,ja-JP;q=0.9,fr-CA;q=0.7"
      )
    ).toBe("ja-JP");
  });

  it('returns "en-US" if nothing matched from the given language range', () => {
    expect(getBestMatchedLocaleOrFallbackFromLanguageRange("fr-CA;q=0.7")).toBe(
      "en-US"
    );
  });
});
