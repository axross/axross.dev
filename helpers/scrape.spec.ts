import { rest } from "msw";
import { setupServer } from "msw/node";
import "next";
import { scrapeWebpage } from "./scrape";

describe("scrapeWebpage()", () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("fetches an html from the given URL and extract essential web page information", async () => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
        return res(
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        );
      })
    );

    const { title, description, imageSrc, href } = await scrapeWebpage(
      "https://dummy.kohei.dev/"
    );

    expect(title).toBe(
      "Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"
    );
    expect(description).toBe(
      "At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."
    );
    expect(imageSrc).toBe("https://dummy.kohei.dev/thumbnail.png");
    expect(href).toBe("https://dummy.kohei.dev/?hl=en-US");
  });

  describe("extracts title in the best effort", () => {
    it("uses title if og:title is not existing", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
              <!DOCTYPE html>
              <html lang="en-US">
              <head>
                <link rel="icon" type="image/png" href="/favicon.png"/>
                <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
                <meta charSet="utf-8"/>
                <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
                <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
                <meta property="og:type" content="article"/>
                <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
                <meta property="og:site_name" content="kohei.dev"/>
                <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
                <meta property="og:author:first_name" content="Kohei"/>
                <meta property="og:author:last_name" content="Asai"/>
                <meta property="og:section" content="react"/>
                <meta property="og:tag" content="react"/>
                <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
                <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
                <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
                <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
              </head>
              <body>
                <p>Hello!</p>
              </body>
              </html>
            `)
          );
        })
      );

      const { title } = await scrapeWebpage("https://dummy.kohei.dev/");

      expect(title).toBe(
        "Nunc scelerisque viverra mauris in aliquam sem fringilla"
      );
    });

    it("uses fallbackTitle if nothing else is existing", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
              <!DOCTYPE html>
              <html lang="en-US">
              <head>
                <link rel="icon" type="image/png" href="/favicon.png"/>
                <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
                <meta charSet="utf-8"/>
                <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
                <meta property="og:type" content="article"/>
                <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
                <meta property="og:site_name" content="kohei.dev"/>
                <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
                <meta property="og:author:first_name" content="Kohei"/>
                <meta property="og:author:last_name" content="Asai"/>
                <meta property="og:section" content="react"/>
                <meta property="og:tag" content="react"/>
                <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
                <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
                <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
                <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
              </head>
              <body>
                <p>Hello!</p>
              </body>
              </html>
            `)
          );
        })
      );

      const { title } = await scrapeWebpage("https://dummy.kohei.dev/", {
        titleFallback: "Vel pharetra vel turpis nunc eget lorem",
      });

      expect(title).toBe("Vel pharetra vel turpis nunc eget lorem");
    });
  });

  describe("extracts imageSrc in the best effort", () => {
    it("prefers to use og:image:secure_url for imageSrc if it's defined", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/>
              <meta property="og:locale:alternate" content="ja-JP"/>
              <meta property="og:image" content="http://dummy.kohei.dev/thumbnail.png"/>
              <meta property="og:image:secure_url" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
          );
        })
      );

      const { imageSrc } = await scrapeWebpage("https://dummy.kohei.dev/");

      expect(imageSrc).toBe("https://dummy.kohei.dev/thumbnail.png");
    });

    it("uses link[rel=apple-touch-icon-precomposed] if meta[property=og:image] is not existing", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/>
              <meta property="og:locale:alternate" content="ja-JP"/>
              <link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://dummy.kohei.dev/icon@144.png" />
              <link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://dummy.kohei.dev/icon@114.png" />
              <link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://dummy.kohei.dev/icon@72.png" />
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
          );
        })
      );

      const { imageSrc } = await scrapeWebpage("https://dummy.kohei.dev/");

      expect(imageSrc).toBe("https://dummy.kohei.dev/icon@144.png");
    });

    it("uses link[rel=icon] if none of og:image or apple touch icon is existing", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/>
              <meta property="og:locale:alternate" content="ja-JP"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
          );
        })
      );

      const { imageSrc } = await scrapeWebpage("https://dummy.kohei.dev/");

      expect(imageSrc).toBe("https://dummy.kohei.dev/favicon.png");
    });

    it("tries to use /favicon.ico if anything else is not existing", async () => {
      server.use(
        rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
          return res(
            ctx.set("content-type", "text/html"),
            ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/>
              <meta property="og:locale:alternate" content="ja-JP"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
          );
        })
      );

      const { imageSrc } = await scrapeWebpage("https://dummy.kohei.dev/");

      expect(imageSrc).toBe("https://dummy.kohei.dev/favicon.ico");
    });
  });

  it("throws an error if the server responded with non-2xx code (302)", async () => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
        return res(
          ctx.status(302),
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        );
      })
    );

    await expect(() =>
      scrapeWebpage("https://dummy.kohei.dev/")
    ).rejects.toThrow();
  });

  it("throws an error if the server responded with non-2xx code (404)", async () => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        );
      })
    );

    await expect(() =>
      scrapeWebpage("https://dummy.kohei.dev/")
    ).rejects.toThrow();
  });

  it("throws an error if the server responded with non-2xx code (302)", async () => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
        return res(
          ctx.status(302),
          ctx.set("content-type", "text/html"),
          ctx.text(`
            <!DOCTYPE html>
            <html lang="en-US">
            <head>
              <link rel="icon" type="image/png" href="/favicon.png"/>
              <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
              <meta charSet="utf-8"/>
              <title>Nunc scelerisque viverra mauris in aliquam sem fringilla</title>
              <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
              <meta property="og:type" content="article"/>
              <meta property="og:url" content="https://dummy.kohei.dev/?hl=en-US"/>
              <meta property="og:site_name" content="kohei.dev"/>
              <meta property="og:title" content="Leo a diam sollicitudin tempor id. Sit amet volutpat consequat mauris nunc congue nisi vitae"/>
              <meta property="og:description" content="At auctor urna nunc id cursus metus aliquam eleifend. Nisi lacus sed viverra tellus in. Vel pharetra vel turpis nunc eget lorem dolor. Tempus urna et pharetra pharetra massa massa ultricies. Odio morbi quis commodo odio. Sed elementum tempus egestas sed sed risus pretium quam. Non nisi est sit amet facilisis magna etiam tempor. Leo vel orci porta non. Vehicula ipsum a arcu cursus vitae congue mauris. Amet commodo nulla facilisi nullam vehicula. In arcu cursus euismod quis viverra nibh. Mi proin sed libero enim. Diam in arcu cursus euismod. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies."/>
              <meta property="og:author:first_name" content="Kohei"/>
              <meta property="og:author:last_name" content="Asai"/>
              <meta property="og:section" content="react"/>
              <meta property="og:tag" content="react"/>
              <meta property="og:published_time" content="2020-01-05T08:00:00.000Z"/>
              <meta property="og:modified_time" content="2020-01-16T08:00:00.000Z"/>
              <meta property="og:locale" content="en-US"/><meta property="og:locale:alternate" content="ja-JP"/>
              <meta property="og:image" content="https://dummy.kohei.dev/thumbnail.png"/>
            </head>
            <body>
              <p>Hello!</p>
            </body>
            </html>
          `)
        );
      })
    );

    await expect(() =>
      scrapeWebpage("https://dummy.kohei.dev/")
    ).rejects.toThrow();
  });

  it("throws an error if the server responded non-html body", async () => {
    server.use(
      rest.get("https://dummy.kohei.dev/", (_, res, ctx) => {
        return res(ctx.json({ foo: "bar" }));
      })
    );

    await expect(() =>
      scrapeWebpage("https://dummy.kohei.dev/")
    ).rejects.toThrow();
  });
});
