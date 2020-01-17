# axross.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/153f81f8-6487-47f5-86b1-ce579c1b186f/deploy-status)](https://app.netlify.com/sites/kohei/deploys)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxross%2Fkohei.dev.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxross%2Fkohei.dev?ref=badge_shield)

This is the source code of my personal website.

## Tech Stacks

Semi-JAM Stack. **Yet no HTML built. Everything is dynamically rendered**.

- Written in **TypeScript**
- Made with **[React](https://reactjs.org)**
- UI components are built on **[Storybook](https://storybook.js.org/)**
- Builds with **[Webpack](https://webpack.js.org/)**
- Blog Posts are stored in **[Contentful](https://www.contentful.com/)**
- Hosted on **[Netlify](https://www.netlify.com/)**
- Serves prerendered HTML (Dynamic Rendering) with **[Netlify Prerendering](https://docs.netlify.com/site-deploys/post-processing/prerendering/)**
- Serves [RSS feeds](https://www.kohei.dev/posts/feed.xml?hl=en-US), [`sitemap.xml`](https://www.kohei.dev/sitemap.xml) and [`robots.txt`](https://www.kohei.dev/robots.txt) by **[Netlify Functions](https://www.netlify.com/products/functions/)**

## Development

1. Fork and clone this repository
2. ```
   npm install
   ```
3. ```
   CONTENTFUL_SPACE=2mfcuy3p355s CONTENTFUL_ACCESS_TOKEN=EKvjDTi2bDOjjW94G0xzRexet5yeerbiqokB2-4k-24 npm run serve:app
   ```

   The access token is for development. Pass them via environement variable in order to use a different access token (and make it secret).
4. The webpage will automatically open on your default browser



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Faxross%2Fkohei.dev.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Faxross%2Fkohei.dev?ref=badge_large)