import { createClient } from "contentful";

export default createClient({
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
