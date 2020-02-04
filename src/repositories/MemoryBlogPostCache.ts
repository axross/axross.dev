import BlogPost, { BlogPostId } from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";
import BlogPostCache from "./BlogPostCache";

export default class MemoryBlogPostCache implements BlogPostCache {
  private cache = new Map<string, BlogPost>();
  
  has(blogPostId: BlogPostId, locale: LocaleString): boolean {
    return this.cache.has(this.createKey(blogPostId, locale));
  }

  get(blogPostId: BlogPostId, locale: LocaleString): BlogPost | null {
    return this.cache.get(this.createKey(blogPostId, locale)) ?? null;
  }

  set(blogPostId: BlogPostId, locale: LocaleString, blogPost: BlogPost): void {
    this.cache.set(this.createKey(blogPostId, locale), blogPost);
  }

  private createKey(blogPostId: BlogPostId, locale: LocaleString): string {
    return `${blogPostId}?${locale}`;
  }
}
