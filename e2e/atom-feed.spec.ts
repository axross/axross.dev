import cheerio from "cheerio";
import { gql, request } from "graphql-request";
import fetch from "node-fetch";
import { AVAILABLE_LOCALES } from "../constants/locale";

describe("Atom Feed", () => {
  describe("/posts/feed.xml", () => {
    describe.each(["en-US", "ja-JP"])("?hl=%s", (locale) => {
      let $: ReturnType<typeof cheerio.load>;

      beforeAll(async () => {
        const response = await fetch(
          `http://localhost:3000/posts/feed.xml?hl=${locale}`
        );
        const xml = await response.text();

        $ = cheerio.load(xml, { xmlMode: true });
      });

      it("has valid id, updated and author URI", async () => {
        expect($("feed > id").text()).toBe(
          `https://www.kohei.dev/posts/feed.xml?hl=${locale}`
        );
        expect(() => new Date($("feed > updated").text())).not.toThrow();
        expect($("feed > author > uri").text()).toBe(
          `https://www.kohei.dev/?hl=${locale}`
        );
      });

      it("has valid self and alternative locale links", async () => {
        expect($('feed > link[rel="self"]').attr("href")).toBe(
          `https://www.kohei.dev/posts/feed.xml?hl=${locale}`
        );

        for (const alternativeLocale of AVAILABLE_LOCALES.filter(
          (l) => l !== locale
        )) {
          expect(
            $(
              `feed > link[rel="alternate"][hreflang="${alternativeLocale}"]`
            ).attr("href")
          ).toBe(
            `https://www.kohei.dev/posts/feed.xml?hl=${alternativeLocale}`
          );
        }
      });

      it("has entries of the latest 100 posts", async () => {
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
          { locale: locale.replace("-", "_") }
        );
        const posts = data.posts;

        for (const [index, post] of posts.entries()) {
          expect($(`feed > entry`).eq(index).find("id").text()).toBe(
            `https://www.kohei.dev/posts/${post.slug}?hl=${locale}`
          );
          expect($(`feed > entry`).eq(index).find("title").text()).toBe(
            post.title
          );
          expect($(`feed > entry`).eq(index).find("summary").text()).toBe(
            post.excerpt
          );
          expect($(`feed > entry`).eq(index).find("author > uri").text()).toBe(
            `https://www.kohei.dev/?hl=${locale}`
          );
        }
      });
    });
  });
});
