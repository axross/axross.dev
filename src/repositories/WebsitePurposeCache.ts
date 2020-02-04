import LocaleString from "../entities/LocaleString";

export default interface WebsitePurposeCache {
  has(locale: LocaleString): boolean;
  get(locale: LocaleString): string | null;
  set(locale: LocaleString, websitePurpose: string): void;
}
