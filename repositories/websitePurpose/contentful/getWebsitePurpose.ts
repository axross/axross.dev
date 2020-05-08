import { ContentfulClientApi } from "contentful";
import GetWebsitePurpose from "../GetWebsitePurpose";

export function createGetWebsitePurpose(
  contentful: ContentfulClientApi
): GetWebsitePurpose {
  return async ({ locale }) => {
    const entries = await contentful.getEntries<any>({
      content_type: "websiteSummary",
      limit: 1,
      locale,
    });

    return entries.items[0].fields.body;
  };
}
