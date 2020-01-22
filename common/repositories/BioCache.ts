import LocaleString from "../entities/LocaleString";

export default interface BioCache {
  has(locale: LocaleString): boolean;
  get(locale: LocaleString): string | null;
  set(locale: LocaleString, bio: string): void;
}
