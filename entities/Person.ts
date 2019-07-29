import SocialLink from "./SocialLink";

interface Person {
  screenName: string;
  givenName: string;
  familyName: string;
  description: string;
  jobTitle: string;
  socialLinks: SocialLink[];
}

export default Person;
