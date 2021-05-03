import { Browser, BrowserContext, Page, Response, webkit } from "playwright";

describe("Locale Redirection", () => {
  let browser: Browser;

  beforeAll(async () => {
    browser = await webkit.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    describe.each([
      ["en-us", "en-us"],
      ["en", "en-us"],
      ["ja-jp", "ja-jp"],
      ["ja", "ja-jp"],
      ["kr-kr", "en-us"],
      ["*", "en-us"],
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

      it("redirects to a valid host name from invalid/obsolete host name", async () => {
        let initialResponse!: Response;

        page.on("response", (response) => {
          if (
            response.request().url() ===
            `${process.env.E2E_TEST_TARGET_ORIGIN}/`
          ) {
            initialResponse = response;
          }
        });

        await page.goto(process.env.E2E_TEST_TARGET_ORIGIN!);

        expect(initialResponse.status()).toBe(308);
        expect(page.url()).toBe(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${expectedLocale}`
        );
      });

      it("doesn't redirect when you use a valid host name", async () => {
        let initialResponse!: Response;

        page.on("response", (response) => {
          if (
            response.request().url() ===
            `${process.env.E2E_TEST_TARGET_ORIGIN}/ja-jp`
          ) {
            initialResponse = response;
          }
        });

        await page.goto(`${process.env.E2E_TEST_TARGET_ORIGIN}/ja-jp`);

        expect(initialResponse.status()).toBe(200);
        expect(page.url()).toBe(`${process.env.E2E_TEST_TARGET_ORIGIN}/ja-jp`);
      });
    });
  });
});
