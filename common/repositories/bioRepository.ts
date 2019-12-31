import { Entry } from "contentful";
import LocaleString from "../entities/LocaleString";
import contentful from "./contentful";

export async function getBioByLocale(locale: LocaleString): Promise<string> {
  const entries = await contentful.getEntries<any>({
    content_type: "person",
    locale
  });

  return parseEntryItemIntoPerson(entries.items[0]);
}

function parseEntryItemIntoPerson(entryItem: Entry<any>) {
  return entryItem.fields.description;
}
