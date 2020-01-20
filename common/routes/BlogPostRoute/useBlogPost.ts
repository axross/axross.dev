import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import BlogPost, { BlogPostId } from "../../entities/BlogPost";

export default function useBlogPost(blogPostId: BlogPostId): [BlogPost | null, boolean] {
  const { blogPostRepository } = React.useContext(RepositoryContext);
  const { currentLocale } = React.useContext(LocaleContext);
  const [[blogPost, isLoading], set] = React.useState<
    [BlogPost | null, boolean]
  >([null, true]);

  React.useEffect(() => {
    blogPostRepository
      .getByIdAndLocale(blogPostId, currentLocale)
      .then(blogPost => set([blogPost, false]))
      .catch(() => set([null, false]));
  }, [blogPostId, currentLocale]);

  return [blogPost, isLoading];
}
