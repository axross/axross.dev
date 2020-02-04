import LocaleString from "../entities/LocaleString";

export default interface WebsitePurposeApi {
  getByLocale(locale: LocaleString): Promise<string>;
}
