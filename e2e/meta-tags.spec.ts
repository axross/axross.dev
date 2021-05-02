import { gql, request } from "graphql-request";
import { Browser, BrowserContext, Page, webkit } from "playwright";
import { WEBSITE_NAME } from "../constants/app";
import { getLocales, toUtsSnakeCaseLocale } from "../helpers/localization";

describe("Meta Tags", () => {
  const locales = getLocales();
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await webkit.launch();
    context = await browser.newContext({ javaScriptEnabled: false });
  });

  beforeEach(async () => {
    page = await context.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await context.close();
    await browser.close();
  });

  describe("/:locale", () => {
    describe.each(locales)("%s", (locale) => {
      let indexPage: any;

      beforeAll(async () => {
        const data = await request(
          process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!,
          gql`
            query($locale: Locale!) {
              indexPages(locales: [$locale, en_US], first: 1) {
                title
                description
                coverImage {
                  url
                }
                body
              }
            }
          `,
          { locale: toUtsSnakeCaseLocale(locale) }
        );

        indexPage = data.indexPages[0];
      });

      it("has valid title, description and keywords", async () => {
        await page.goto(`${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}`);

        expect(await page.title()).toBe(WEBSITE_NAME);
        expect(
          await page.getAttribute('meta[name="description"]', "content")
        ).toBe(indexPage.description);
        expect(
          await page.getAttribute('meta[name="keywords"]', "content")
        ).toBe("kohei asai,axross,blog");
      });

      it("has valid open graph data", async () => {
        await page.goto(`${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}`);

        expect(
          await page.getAttribute('meta[property="og:url"]', "content")
        ).toBe(`${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}`);
        expect(
          await page.getAttribute('meta[property="og:site_name"]', "content")
        ).toBe(WEBSITE_NAME);
        expect(
          await page.getAttribute('meta[property="og:title"]', "content")
        ).toBe(WEBSITE_NAME);
        expect(
          await page.getAttribute('meta[property="og:description"]', "content")
        ).toBe(indexPage.description);
        expect(
          await page.getAttribute('meta[property="og:locale"]', "content")
        ).toBe(locale);

        for (const altLocale of locales.filter((l) => l !== locale)) {
          expect(
            await page.$(
              `meta[property="og:locale:alternate"][content="${altLocale}"]`
            )
          ).not.toBeNull();
        }

        expect(
          await page.getAttribute('meta[property="og:image"]', "content")
        ).toBe(indexPage.coverImage.url);
      });
    });
  });

  describe("/:locale/posts/:slug", () => {
    beforeAll(async () => {});

    describe.each(locales)("%s", (locale) => {
      let post: any;

      beforeAll(async () => {
        const data = await request(
          process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!,
          gql`
            query($locale: Locale!) {
              posts(
                where: { isAvailable: true }
                orderBy: firstPublishedAt_DESC
                locales: [$locale, en_US]
                first: 1
              ) {
                slug
                title
                excerpt
                coverImage {
                  url
                }
                author {
                  name
                  avatar {
                    url
                  }
                }
                body
                tags
                firstPublishedAt
                lastModifiedAt
              }
            }
          `,
          { locale: toUtsSnakeCaseLocale(locale) }
        );

        post = data.posts[0];
      });

      it("has valid title, description and keywords", async () => {
        await page.goto(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/${post.slug}`
        );

        expect(await page.title()).toBe(`${post.title} - ${WEBSITE_NAME}`);
        expect(
          await page.getAttribute('meta[name="description"]', "content")
        ).toBe(post.excerpt);
        expect(
          await page.getAttribute('meta[name="keywords"]', "content")
        ).toBe(post.tags.join(","));
      });

      it("has valid open graph data", async () => {
        await page.goto(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/${post.slug}`
        );

        expect(
          await page.getAttribute('meta[property="og:url"]', "content")
        ).toBe(
          `${process.env.E2E_TEST_TARGET_ORIGIN}/${locale}/posts/${post.slug}`
        );
        expect(
          await page.getAttribute('meta[property="og:site_name"]', "content")
        ).toBe(WEBSITE_NAME);
        expect(
          await page.getAttribute('meta[property="og:title"]', "content")
        ).toBe(`${post.title} - ${WEBSITE_NAME}`);
        expect(
          await page.getAttribute('meta[property="og:description"]', "content")
        ).toBe(post.excerpt);
        expect(
          await page.getAttribute('meta[property="og:locale"]', "content")
        ).toBe(locale);

        for (const altLocale of locales.filter((l) => l !== locale)) {
          expect(
            await page.$(
              `meta[property="og:locale:alternate"][content="${altLocale}"]`
            )
          ).not.toBeNull();
        }

        expect(
          await page.getAttribute('meta[property="og:image"]', "content")
        ).toBe(post.coverImage.url);
      });
    });
  });
});
