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
        const response = await page.goto(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/applying-dark-mode-on-the-web`
        );

        console.log(response!.status());
        console.log(await response!.text());

        console.log(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/applying-dark-mode-on-the-web`
        );
        console.log(page.url());
        console.log(await page.content());

        const viewportHeight = page.viewportSize()!.height;
        const tocItem = await page.$(
          "[data-testid=table-of-contents] [data-testid=item]:nth-last-child(2) a"
        );

        console.log(tocItem);

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
