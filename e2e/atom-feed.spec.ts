import cheerio from "cheerio";
import fetch from "node-fetch";
import { getLocales } from "../helpers/localization";

describe("Atom Feed", () => {
  const locales = getLocales();

  describe("/posts/feed.xml", () => {
    describe.each(locales)("%s", (locale) => {
      let $: ReturnType<typeof cheerio.load>;

      beforeAll(async () => {
        const response = await fetch(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/feed.xml`
        );
        const xml = await response.text();

        $ = cheerio.load(xml, { xmlMode: true });
      });

      it("has valid id, updated and author URI", async () => {
        expect($("feed > id").text()).toBe(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/feed.xml`
        );
        expect(() => new Date($("feed > updated").text())).not.toThrow();
        expect($("feed > author > uri").text()).toBe(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}`
        );
      });

      it("has valid self and alternative locale links", async () => {
        expect($('feed > link[rel="self"]').attr("href")).toBe(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/feed.xml`
        );

        for (const altLocale of locales.filter((l) => l !== locale)) {
          expect(
            $(`feed > link[rel="alternate"][hreflang="${altLocale}"]`).attr(
              "href"
            )
          ).toBe(
            `${process.env.E2E_TEST_TARGET_ORIGIN}/${altLocale}/posts/feed.xml`
          );
        }
      });
    });
  });
});
