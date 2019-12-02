import { Entry } from "contentful";
import LocaleString from "../entities/LocaleString";
import Person, { SocialLink } from "../entities/Person";
import contentful from "./contentful";

export async function getMyselfbyLocale(locale: LocaleString): Promise<Person> {
  const entries = await contentful.getEntries<any>({
    content_type: "person",
    locale
  });

  return parseEntryItemIntoPerson(entries.items[0]);
}

function parseEntryItemIntoPerson(entryItem: Entry<any>) {
  return Person.fromJSON({
    screenName: entryItem.fields.screenName,
    name: entryItem.fields.name,
    description: entryItem.fields.description,
    jobTitle: entryItem.fields.jobTitle,
    socialLinks: entryItem.fields.socialLinks.map((item: any) =>
      parseEntryItemIntoSocialLink(item)
    )
  });
}

function parseEntryItemIntoSocialLink(entryItem: Entry<any>) {
  return SocialLink.fromJSON({
    name: entryItem.fields.name,
    url: entryItem.fields.url,
    username: entryItem.fields.username
  });
}
