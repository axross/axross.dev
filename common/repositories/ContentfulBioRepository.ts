import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";
import BioRepository from "./BioRepository";

export default class ContentfulBioRepository implements BioRepository {
  constructor(contentful: ContentfulClientApi) {
    this.contentful = contentful;
  }

  private contentful: ContentfulClientApi;

  async getByLocale(locale: LocaleString): Promise<string> {
    const entries = await this.contentful.getEntries<any>({
      content_type: "person",
      locale
    });

    return entries.items[0].fields.description;
  }
}
