import { Browser, BrowserContext, Page, Response, webkit } from "playwright";

describe("Locale Navigation", () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await webkit.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    describe.each([
      ["en-US", "en-US"],
      ["en-GB", "en-US"],
      ["en", "en-US"],
      ["ja-JP", "ja-JP"],
      ["ja", "ja-JP"],
      ["fr-FR", "en-US"],
    ])("when you prefer %s", (preferredLocale, expectedLocale) => {
      let context!: BrowserContext;
      let page: Page;

      beforeAll(async () => {
        context = await browser.newContext({ locale: preferredLocale });
      });

      beforeEach(async () => {
        page = await context.newPage();
      });

      afterEach(async () => {
        await page.close();
      });

      afterAll(async () => {
        await context.close();
      });

      it("redirects with a locale search param when it was missing", async () => {
        let initialResponse!: Response;

        page.on("response", (response) => {
          if (response.request().url() === "http://localhost:3000/") {
            initialResponse = response;
          }
        });

        await page.goto("http://localhost:3000/");

        expect(initialResponse.status()).toBe(308);
        expect(page.url()).toBe(`http://localhost:3000/?hl=${expectedLocale}`);
      });

      it("doesn't redirect when the valid locale search param is given", async () => {
        let initialResponse!: Response;

        page.on("response", (response) => {
          if (
            response.request().url() ===
            `http://localhost:3000/?hl=${expectedLocale}`
          ) {
            initialResponse = response;
          }
        });

        await page.goto(`http://localhost:3000/?hl=${expectedLocale}`);

        expect(initialResponse.status()).toBe(200);
        expect(page.url()).toBe(`http://localhost:3000/?hl=${expectedLocale}`);
      });
    });
  });
});
