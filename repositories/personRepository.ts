import LocaleString from "../entities/LocaleString";
import Person from "../entities/Person";
import { parseContentfulEntryToPerson } from "../parsers/person";
import contentful from "./contentful";

export async function getMyself({
  locale
}: {
  locale: LocaleString;
}): Promise<Person> {
  const entries = await contentful.getEntries<any>({
    content_type: "person",
    locale
  });

  return parseContentfulEntryToPerson(entries.items[0]);
}
