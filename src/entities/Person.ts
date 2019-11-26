import SocialLink from "./SocialLink";

export default interface Person {
  screenName: string;
  name: string;
  description: string;
  jobTitle: string;
  socialLinks: SocialLink[];
}

