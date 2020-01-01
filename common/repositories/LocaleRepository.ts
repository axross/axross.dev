import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";

export default interface LocaleRepository {
  getDefaultOne(): Promise<LocaleString>;

  getAllAvailableOnes(): Promise<LocaleString[]>;
}

export class ContentfulLocaleRepository implements LocaleRepository {
  constructor(contentful: ContentfulClientApi) {
    this.contentful = contentful;
  }

  private contentful: ContentfulClientApi;

  async getDefaultOne(): Promise<LocaleString> {
    const space = await this.contentful.getSpace();
    const locales: LocaleString[] = space.locales
      .filter(({ default: def }: any) => def)
      .map(({ code }: any) => code);

    return locales[0];
  }

  async getAllAvailableOnes(): Promise<LocaleString[]> {
    const space = await this.contentful.getSpace();
    const locales: LocaleString[] = space.locales.map(({ code }: any) => code);

    return locales;
  }
}
