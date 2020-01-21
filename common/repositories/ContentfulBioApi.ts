import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";
import BioApi from "./BioApi";

export default class ContentfulBioApi implements BioApi {
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
