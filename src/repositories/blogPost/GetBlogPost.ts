import BlogPost, { BlogPostId } from "../../entities/BlogPost";
import LocaleString from "../../entities/LocaleString";

type GetBlogPost = (params: { id: BlogPostId, locale: LocaleString }) => Promise<BlogPost>;

export default GetBlogPost;
