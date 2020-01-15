import LocaleString from "../entities/LocaleString";

export default interface BioRepository {
  getByLocale(locale: LocaleString): Promise<string>;
}
