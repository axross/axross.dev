import LocaleString from "../entities/LocaleString";

export default interface BioApi {
  getByLocale(locale: LocaleString): Promise<string>;
}
