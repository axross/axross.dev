module.exports = {
  cleanUrls: true,
  trailingSlash: false,
  env: {
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    ORIGIN: process.env.ORIGIN,
  },
};
