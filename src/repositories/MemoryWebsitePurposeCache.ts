import LocaleString from "../entities/LocaleString";
import WebsitePurposeCache from "./WebsitePurposeCache";

export default class MemoryWebsitePurposeCache implements WebsitePurposeCache {
  private cache = new Map<string, string>();
  
  has(locale: LocaleString): boolean {
    return this.cache.has(locale);
  }

  get(locale: LocaleString): string | null {
    return this.cache.get(locale) ?? null;
  }

  set(locale: LocaleString, websitePurpose: string): void {
    this.cache.set(locale, websitePurpose);
  }
}
