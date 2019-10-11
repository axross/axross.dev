import { createClient } from "contentful";

const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

export function createContentfulPreview(accessToken: string) {
  return createClient({
    host: "preview.contentful.com",
    space: process.env.CONTENTFUL_SPACE!,
    accessToken
  });
}

export default contentful;
