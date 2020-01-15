import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";
import WebsitePurposeRepository from "./WebsitePurposeRepository";

export default class ContentfulWebsitePurposeRepository implements WebsitePurposeRepository {
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
