import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";

export default interface WebsitePurposeRepository {
  getByLocale(locale: LocaleString): Promise<string>;
}

export class ContentfulWebsitePurposeRepository implements WebsitePurposeRepository {
  constructor(contentful: ContentfulClientApi) {
    this.contentful = contentful;
  }

  private contentful: ContentfulClientApi;

  async getByLocale(locale: LocaleString): Promise<string> {
    const entries = await this.contentful.getEntries<any>({
      content_type: "websiteSummary",
      limit: 1,
      locale,
    });

    return entries.items[0].fields.body;
  }
}
