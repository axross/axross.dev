import { ContentfulClientApi } from "contentful";
import GetBio from "../GetBio";

export function createGetBio(contentful: ContentfulClientApi): GetBio {
  return async ({ locale }) => {
    const entries = await contentful.getEntries<any>({
      content_type: "person",
      locale,
    });

    return entries.items[0].fields.description;
  };
}
