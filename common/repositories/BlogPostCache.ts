import BlogPost, { BlogPostId } from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";

export default interface BlogPostCache {
  has(blogPostId: BlogPostId, locale: LocaleString): boolean;
  get(blogPostId: BlogPostId, locale: LocaleString): BlogPost | null;
  set(blogPostId: BlogPostId, locale: LocaleString, blogPost: BlogPost): void;
}
