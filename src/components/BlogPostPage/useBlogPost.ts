import { useQuery } from "react-query";
import BlogPost, { BlogPostId } from "../../entities/BlogPost";
import useLocale from "../../hooks/useLocale";
import useRepository from "../../hooks/useRepository";

export default function useBlogPost({ id }: { id: BlogPostId }): [BlogPost | null, boolean] {
  const { getBlogPost } = useRepository();
  const { currentLocale } = useLocale();

  // TODO:
  // catch error and send it to Sentry later
  const { data: blogPost, isLoading } = useQuery(
    ["blog-post", { id,  locale: currentLocale }],
    getBlogPost,
    { initialData: null }
  );

  return [blogPost, isLoading];
}
