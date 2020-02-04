import LocaleString from "../entities/LocaleString";
import BioCacheApi from "./BioCache";

export default class MemoryBioCacheApi implements BioCacheApi {
  private cache = new Map<string, string>();
  
  has(locale: LocaleString): boolean {
    return this.cache.has(locale);
  }

  get(locale: LocaleString): string | null {
    return this.cache.get(locale) ?? null;
  }

  set(locale: LocaleString, bio: string): void {
    this.cache.set(locale, bio);
  }
}
