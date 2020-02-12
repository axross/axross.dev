import { useQuery } from "react-query";
import BlogPost from "../../entities/BlogPost";
import useLocale from "../../hooks/useLocale";
import useRepository from "../../hooks/useRepository";

export default function useBlogPosts(): [BlogPost[], boolean] {
  const { getAllBlogPosts } = useRepository();
  const { currentLocale } = useLocale();

  // TODO:
  // catch error and send it to Sentry later
  const { data: blogPosts, isLoading } = useQuery(
    ["blog-posts", { locale: currentLocale }],
    getAllBlogPosts,
    { initialData: [] }
  );

  return [blogPosts as BlogPost[], isLoading];
}
