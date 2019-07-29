import SocialLink from "./SocialLink";

interface Person {
  screenName: string;
  name: string;
  description: string;
  jobTitle: string;
  socialLinks: SocialLink[];
}

export default Person;
