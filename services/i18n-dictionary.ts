export abstract class I18nDictionaryService {
  abstract fetch(locale: string): Promise<Record<string, any>>;
}

export class EmptyI18nDictionaryService implements I18nDictionaryService {
  async fetch(_locale: string): Promise<Record<string, any>> {
    return {};
  }
}

export class IsomorphicI18nDictionaryService implements I18nDictionaryService {
  async fetch(locale: string): Promise<Record<string, any>> {
    const response = await fetch(
      `https://cdn.simplelocalize.io/${process.env.NEXT_PUBLIC_SIMPLE_LOCALIZE_TOKEN}/_latest/${locale}`
    );

    return await response.json();
  }
}
