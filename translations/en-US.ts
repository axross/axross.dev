import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";
import Translation from "./Translation";

const translations: Translation = {
  "website.title": person =>
    `${person.givenName} ${person.familyName} / @${person.screenName}`,
  "website.title_blog_post": (blogPost, person) =>
    `${blogPost.title} | written by ${person.givenName} ${person.familyName}`,
  "website.description": person =>
    `${person.givenName} ${person.familyName}'s personal website.`,
  person_name: person => `${person.givenName} ${person.familyName}`,
  whoami: () => "whoami",
  recent_n_blog_posts: () => "Blog posts",
  "language.en-US": () => "English",
  "language.ja-JP": () => "Japanese",
  "blogPost.timestamp": (createdAt, _) =>
    `Written ${formatRelative(createdAt, new Date(), {
      locale: enUS
    })}`,
  "blogPost.written_at": createdAt =>
    `Written ${formatRelative(createdAt, new Date(), {
      locale: enUS
    })}`
};

export default translations;
