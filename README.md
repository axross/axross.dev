# axross.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/153f81f8-6487-47f5-86b1-ce579c1b186f/deploy-status)](https://app.netlify.com/sites/kohei/deploys)

A production-level progressive web app dynamic rendering using:

- <img alt="TypeScript" src="https://user-images.githubusercontent.com/4289883/72760400-7524e080-3b8d-11ea-9b0c-f6e09280e6d8.png" height="16"> **[TypeScript](https://www.typescriptlang.org/)**
- <img alt="React" src="https://user-images.githubusercontent.com/4289883/72760398-7524e080-3b8d-11ea-95ea-736bd3081ac9.png" height="16"> **[React](https://reactjs.org)**
- <img alt="jest" src="https://user-images.githubusercontent.com/4289883/72760396-748c4a00-3b8d-11ea-9eba-e3df28a3f18a.png" height="16"> **[Jest](https://jestjs.io/)**
- <img alt="Styled Components" src="https://user-images.githubusercontent.com/4289883/72763135-3005ac00-3b97-11ea-8082-100ccbde5ddc.png" height="16"> **[Styled Components](https://styled-components.com/)**
- <img alt="storybook" src="https://user-images.githubusercontent.com/4289883/72760399-7524e080-3b8d-11ea-9174-1aa265d9c239.png" height="16"> **[Storybook](https://storybook.js.org/)**
- <img alt="webpack" src="https://user-images.githubusercontent.com/4289883/72760401-7524e080-3b8d-11ea-8f0a-4e7b5b82e835.png" height="16"> **[Webpack](https://webpack.js.org/)**
- <img alt="contentful" src="https://user-images.githubusercontent.com/4289883/72760394-748c4a00-3b8d-11ea-9a34-13a121d2d9d8.png" height="16"> **[Contentful](https://www.contentful.com/)**
- <img alt="netlify" src="https://user-images.githubusercontent.com/4289883/72760397-748c4a00-3b8d-11ea-886d-ba3c8836f230.png" height="16"> **[Netlify](https://www.netlify.com/)**
    - **[Netlify Prerendering](https://docs.netlify.com/site-deploys/post-processing/prerendering/)**
    - **[Netlify Functions](https://www.netlify.com/products/functions/)**

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

