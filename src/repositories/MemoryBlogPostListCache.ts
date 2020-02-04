import LocaleString from "../entities/LocaleString";
import BlogPostListCache from "./BlogPostListCache";
import BlogPost from "../entities/BlogPost";

export default class MemoryBlogPostListCache implements BlogPostListCache {
  private cache = new Map<string, BlogPost[]>();
  
  has(locale: LocaleString): boolean {
    return this.cache.has(locale);
  }

  get(locale: LocaleString): BlogPost[] {
    return this.cache.get(locale) ?? [];
  }

  set(locale: LocaleString, blogPosts: BlogPost[]): void {
    this.cache.set(locale, blogPosts);
  }
}
