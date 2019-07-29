import { formatRelative } from "date-fns";
import { ja } from "date-fns/locale";
import Translation from "./Translation";

const translations: Translation = {
  "website.title": person =>
    `@${person.screenName} / ${person.familyName} ${person.givenName}`,
  "website.title_blog_post": (blogPost, person) =>
    `${blogPost.title} | written by @${person.screenName}`,
  "website.description": person => `@${person.screenName}のウェブサイト`,
  person_name: person => `${person.familyName} ${person.givenName}`,
  whoami: () => "whoami",
  recent_n_blog_posts: () => "ブログ",
  "language.en-US": () => "English",
  "language.ja-JP": () => "日本語",
  "blogPost.timestamp": (createdAt, _) =>
    `${formatRelative(createdAt, new Date(), {
      locale: ja
    })}に投稿`,
  "blogPost.written_at": createdAt =>
    `${formatRelative(createdAt, new Date(), {
      locale: ja
    })}に投稿`
};

export default translations;
