import { Browser, Page, webkit } from "playwright";

describe("/", () => {
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

  it("redirects with locale search params when it was missing", async () => {
    await page.goto("http://localhost:3000/");

    expect(page.url()).toBe("http://localhost:3000/?hl=en-US");
  });

  it("shows the article title", async () => {
    await page.goto("http://localhost:3000/?hl=en-US");

    expect(await page.textContent("data-testid=article-title")).toBe(
      "Kohei Asai"
    );
  });
});
