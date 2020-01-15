import LocaleString from "../entities/LocaleString";

export default interface WebsitePurposeRepository {
  getByLocale(locale: LocaleString): Promise<string>;
}
