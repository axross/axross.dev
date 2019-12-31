import { ContentfulClientApi } from "contentful";
import LocaleString from "../entities/LocaleString";
import defaultContentful from "./contentful";

export async function getDefaultLocale({
  contentful = defaultContentful
}: { contentful?: ContentfulClientApi } = {}): Promise<LocaleString> {
  const space = await contentful.getSpace();
  const locales: LocaleString[] = space.locales
    .filter(({ default: def }: any) => def)
    .map(({ code }: any) => code);

  return locales[0];
}

export async function getAllAvailableLocales(): Promise<LocaleString[]> {
  const space = await defaultContentful.getSpace();
  const locales: LocaleString[] = space.locales.map(({ code }: any) => code);

  return locales;
}
