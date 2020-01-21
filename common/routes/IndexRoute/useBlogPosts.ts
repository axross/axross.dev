import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import BlogPost from "../../entities/BlogPost";

export default function useBlogPosts(): [BlogPost[], boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { blogPostRepository } = React.useContext(RepositoryContext);
  const [[blogPosts, isLoading], set] = React.useState<[BlogPost[], boolean]>([[], true]);

  React.useEffect(() => {
    blogPostRepository
      .getAllByLocale(currentLocale)
      .then(blogPosts => set([blogPosts, false]))
      .catch(() => set([[], false]));
  }, [currentLocale]);

  return [blogPosts, isLoading];
}
