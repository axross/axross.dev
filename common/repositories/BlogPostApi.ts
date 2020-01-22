import BlogPost from "../entities/BlogPost";
import LocaleString from "../entities/LocaleString";

export default interface BlogPostApi {
  getAllByLocale(locale: LocaleString): Promise<BlogPost[]>;

  getByIdAndLocale(blogPostId: string, locale: LocaleString): Promise<BlogPost>;
}
