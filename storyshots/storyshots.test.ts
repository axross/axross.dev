import initStoryshots from '@storybook/addon-storyshots';
import { puppeteerTest } from '@storybook/addon-storyshots-puppeteer';

const errorListener = (err: Error) => console.error(err);

const VIEWPORTS = new Map([
  ["laptop", { width: 1280, height: 720 }],
  ["tablet", { width: 960, height: 720 }],
  ["phone", { width: 375, height: 812 }],
]);

const COLOR_SCHEMES = ["light", "dark"];

const FONTS = [
  "normal 400 1rem Montserrat",
  "italic 400 1rem Montserrat",
  "normal 600 1rem Montserrat",
  "italic 600 1rem Montserrat",
  "normal 400 1rem 'Open Sans'",
  "italic 400 1rem 'Open Sans'",
  "normal 700 1rem 'Open Sans'",
  "italic 700 1rem 'Open Sans'",
  "normal 400 1rem 'Source Code Pro'",
  "italic 400 1rem 'Source Code Pro'",
  "normal 600 1rem 'Source Code Pro'",
  "italic 600 1rem 'Source Code Pro'",
  "normal 700 1rem 'Source Code Pro'",
  "italic 700 1rem 'Source Code Pro'",
];

initStoryshots({
  suite: "Visual Regression",
  test: puppeteerTest({
    testBody: async (page, { context: { kind, story, parameters } }) => {
      if (!page.listeners("error").includes(errorListener)) {
        page.on("error", errorListener);
        page.once("close", () => page.removeListener("error", errorListener));
      }

      if (parameters.waitForFontLoading) {
        // check and wait for <link href="https://fonts.google..." />
        await page.mainFrame().waitForSelector("link[data-test-key=\"googlefonts\"]");
        await Promise.all(FONTS.map(font => page.evaluate((font: any) => (document as any).fonts.load(font), font)));
      }

      for (const [viewportName, viewportMetrics] of VIEWPORTS) {
        for (const colorScheme of COLOR_SCHEMES) {
          await page.setViewport(viewportMetrics);

          await page.emulateMediaFeatures([
            { name: "prefers-color-scheme", value: colorScheme },
          ]);

          const image = await page.screenshot();

          expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: 
              kind.toLowerCase().replace(/[^a-z0-9]/g, "-") +
              "-" +
              story.toLowerCase().replace(/[^a-z0-9]/g, "-") +
              "-" +
              viewportName +
              "-" +
              colorScheme,
            ...parameters.looseImageSnapshot
              ? {
                customDiffConfig: {
                  threshold: 0.3,
                },
              }
              : {},
          });
        }
      }
    },
  }),
});
