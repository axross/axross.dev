import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import useLocale from "../../../hooks/useLocale";
import useRepository from "../../../hooks/useRepository";

export default function useBlogPosts(): [BlogPost[], boolean] {
  type State = [BlogPost[], boolean];

  const { blogPostListCache, blogPostApi } = useRepository();
  const { currentLocale } = useLocale();
  const [[blogPosts, isLoading], set] = React.useState<State>(() => {
    if (blogPostListCache.has(currentLocale)) {
      return [blogPostListCache.get(currentLocale), false];
    }

    return [[], true];
  });

  React.useEffect(() => {
    if (blogPostListCache.has(currentLocale)) {
      const nextBlogPostCache = blogPostListCache.get(currentLocale);

      if (nextBlogPostCache !== blogPosts) {
        set([nextBlogPostCache, false]);
      }
    } else {
      if (!isLoading) {
        set([blogPosts, true]);
      }

      blogPostApi
        .getAllByLocale(currentLocale)
        .then(blogPosts => {
          blogPostListCache.set(currentLocale, blogPosts);

          set([blogPosts, false]);
        })
        .catch(() => set([[], false]));
    }
  }, [currentLocale]);

  return [blogPosts, isLoading];
}
