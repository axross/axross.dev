import { Browser, Page, webkit } from "playwright";

describe("/posts/[slug]", () => {
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
    await page.goto("http://localhost:3000/posts/react-content-loader");

    expect(page.url()).toBe(
      "http://localhost:3000/posts/react-content-loader?hl=en-US"
    );
  });

  it("shows the article title", async () => {
    await page.goto(
      "http://localhost:3000/posts/react-content-loader?hl=en-US"
    );

    expect(await page.textContent("data-testid=article-title")).toBe(
      "Implementing Loading Placeholder with React Content Loader"
    );
  });
});
