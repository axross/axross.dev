import Person from "../entities/Person";
import { parseContentfulEntryToSocialLink } from "./socialLink";

export function parseJsonToPerson(json: Record<string, any>): Person {
  return json as Person;
}

export function parseContentfulEntryToPerson(entry: any): Person {
  const _fields = { ...entry.fields };

  return {
    screenName: _fields.screenName,
    name: _fields.name,
    description: _fields.description,
    jobTitle: _fields.jobTitle,
    socialLinks: _fields.socialLinks.map((item: any) =>
      parseContentfulEntryToSocialLink(item)
    )
  };
}

export function jsonifyPerson(person: Person): Record<string, any> {
  return person;
}
