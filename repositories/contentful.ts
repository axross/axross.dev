import { createClient } from "contentful";

const CONTENTFUL_SPACE = "2mfcuy3p355s";
const ACCESS_TOKEN = "EKvjDTi2bDOjjW94G0xzRexet5yeerbiqokB2-4k-24";

const contentful = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: ACCESS_TOKEN
});

export function createContentfulPreview(accessToken: string) {
  return createClient({
    host: "preview.contentful.com",
    space: CONTENTFUL_SPACE,
    accessToken
  });
}

export default contentful;
