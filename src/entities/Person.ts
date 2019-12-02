export default class Person {
  readonly screenName: string;
  readonly name: string;
  readonly description: string;
  readonly jobTitle: string;
  readonly socialLinks: SocialLink[];

  constructor({
    screenName,
    name,
    description,
    jobTitle,
    socialLinks
  }: {
    screenName: string;
    name: string;
    description: string;
    jobTitle: string;
    socialLinks: SocialLink[];
  }) {
    this.screenName = screenName;
    this.name = name;
    this.description = description;
    this.jobTitle = jobTitle;
    this.socialLinks = socialLinks;
  }

  toJSON(): PersonJSON {
    return {
      screenName: this.screenName,
      name: this.name,
      description: this.description,
      jobTitle: this.jobTitle,
      socialLinks: this.socialLinks.map(socialLink => socialLink.toJSON())
    };
  }

  static fromJSON(json: PersonJSON): Person {
    return new Person({
      screenName: json.screenName,
      name: json.name,
      description: json.description,
      jobTitle: json.jobTitle,
      socialLinks: json.socialLinks.map(json => SocialLink.fromJSON(json))
    });
  }
}

export interface PersonJSON {
  screenName: string;
  name: string;
  description: string;
  jobTitle: string;
  socialLinks: SocialLinkJSON[];
}

export class SocialLink {
  readonly name: string;
  readonly url: URL;
  readonly username: string;

  constructor({
    name,
    url,
    username
  }: {
    name: string;
    url: URL;
    username: string;
  }) {
    this.name = name;
    this.url = url;
    this.username = username;
  }

  toJSON(): SocialLinkJSON {
    return {
      name: this.name,
      url: this.url.href,
      username: this.username
    };
  }

  static fromJSON(json: SocialLinkJSON): SocialLink {
    return new SocialLink({
      name: json.name,
      url: new URL(json.url),
      username: json.username
    });
  }
}

export interface SocialLinkJSON {
  name: string;
  url: string;
  username: string;
}
