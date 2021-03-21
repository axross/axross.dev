import { Browser, Page, webkit } from "playwright";

describe("Post Page Navigation", () => {
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

  describe("/posts/[slug]", () => {
    describe.each(["en-US", "ja-JP"])("?hl=%s", (locale) => {
      it("scroll to the heading when an item in table of contents is clicked", async () => {
        await page.goto(
          `http://localhost:3000/posts/applying-dark-mode-on-the-web?hl=${locale}`
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
