import { Browser, Page, Response, webkit } from "playwright";

describe("Locale Navigation", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await webkit.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/", () => {
    it("redirects with locale search params when it was missing", async () => {
      let initialResponse!: Response;

      page.on("response", (response) => {
        if (response.request().url() === "http://localhost:3000/") {
          initialResponse = response;
        }
      });

      await page.goto("http://localhost:3000/");

      expect(initialResponse.status()).toBe(308);
      expect(page.url()).toBe("http://localhost:3000/?hl=en-US");
    });

    it("doesn't redirect when the valid locale search params is given", async () => {
      let initialResponse!: Response;

      page.on("response", (response) => {
        if (response.request().url() === "http://localhost:3000/?hl=en-US") {
          initialResponse = response;
        }
      });

      await page.goto("http://localhost:3000/?hl=en-US");

      expect(initialResponse.status()).toBe(200);
      expect(page.url()).toBe("http://localhost:3000/?hl=en-US");
    });
  });
});
