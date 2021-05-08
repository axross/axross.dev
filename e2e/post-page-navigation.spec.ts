import { Browser, Page, webkit } from "playwright";
import { getLocales } from "../helpers/localization";

describe("Post Page Navigation", () => {
  const locales = getLocales();
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

  describe("/posts/:slug", () => {
    describe.each(locales)("%s", (locale) => {
      it("scroll to the heading when an item in table of contents is clicked", async () => {
        await page.goto(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/applying-dark-mode-on-the-web`
        );

        const viewportHeight = page.viewportSize()!.height;
        const tocItem = await page.$(
          "[data-testid=table-of-contents] [data-testid=item]:nth-last-child(2) a"
        );

        const heading = await page.$(
          `#${(await tocItem?.getAttribute("href"))!.split("#")[1]}`
        );

        expect((await heading?.boundingBox())!.y).toBeGreaterThan(
          viewportHeight
        );

        await tocItem!.click();

        expect((await heading?.boundingBox())!.y).toBeLessThanOrEqual(
          viewportHeight
        );
      });
    });
  });
});
