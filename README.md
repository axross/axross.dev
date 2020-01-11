# axross.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/153f81f8-6487-47f5-86b1-ce579c1b186f/deploy-status)](https://app.netlify.com/sites/kohei/deploys)

This is the source code of my personal website. The following is why and how I made:

- [I made a SSR-ed personal website with "full" i18n!](https://axross.dev/posts/made-ssr-i18n-website)
  - [Japanese version / 日本語版](https://axross.dev/posts/made-ssr-i18n-website?hl=ja-JP)

## Development

1. Fork and clone this repository
2. ```
   npm install
   ```
3. ```
   URL=http://localhost:3000 CONTENTFUL_SPACE=2mfcuy3p355s CONTENTFUL_ACCESS_TOKEN=EKvjDTi2bDOjjW94G0xzRexet5yeerbiqokB2-4k-24 npm run dev
   ```

   The access token is for development. Pass them via environement variable in order to use a different access token (and make it secret).
4. The webpage will automatically open on your default browser

