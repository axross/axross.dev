import BlogPost from "../../entities/BlogPost";
import LocaleString from "../../entities/LocaleString";

type GetAllBlogPosts = (params: { locale: LocaleString }) => Promise<BlogPost[]>;

export default GetAllBlogPosts;
