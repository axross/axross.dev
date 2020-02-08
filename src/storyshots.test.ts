import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
  suite: "Visual Regression",
  test: imageSnapshot({
    getMatchOptions: ({ context: { kind, story, parameters } }) => ({
      customSnapshotIdentifier: ({ counter }: any) =>
          kind.toLowerCase().replace(/[^a-z0-9]/g, "-")
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
    beforeScreenshot: () =>
      new Promise(resolve => setTimeout(() => resolve(), 300)),
  }),
});
