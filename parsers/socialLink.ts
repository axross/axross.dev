import SocialLink from "../entities/SocialLink";

export function parseJsonToSocialLink(json: Record<string, any>): SocialLink {
  return json as SocialLink;
}

export function parseContentfulEntryToSocialLink(entry: any): SocialLink {
  const _fields = { ...entry.fields };

  return {
    name: _fields.name,
    url: _fields.url,
    username: _fields.username
  };
}

export function jsonifySocialLink(person: SocialLink): Record<string, any> {
  return person;
}
