import BlogPost from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";

export default interface BlogPostListCache {
  has(locale: LocaleString): boolean;
  get(locale: LocaleString): BlogPost[];
  set(locale: LocaleString, blogPosts: BlogPost[]): void;
}
