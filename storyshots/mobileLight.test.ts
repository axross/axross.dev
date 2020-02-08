import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
  suite: "Visual Regression (Desktop / Dark)",
  test: imageSnapshot({
    getMatchOptions: ({ context: { kind, story, parameters } }) => ({
      customSnapshotIdentifier: ({ counter }: any) =>
        "mobile-light-"
          + kind.toLowerCase().replace(/[^a-z0-9]/g, "-")
          + "-"
          + story.toLowerCase().replace(/[^a-z0-9]/g, "-")
          + "-"
          + counter,
      ...parameters.looseImageSnapshot
        ? {
          customDiffConfig: {
            threshold: 0.3,
          },
        }
        : {},
    }),
    beforeScreenshot: async page => {
      await page.setViewport({ width: 375, height: 812 });
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "light" },
      ]);

      await new Promise(resolve => setTimeout(() => resolve(), 300));
    },
  }),
});
