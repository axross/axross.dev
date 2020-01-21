import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";
import BlogPost from "../../entities/BlogPost";

export default function useBlogPosts(): [BlogPost[], boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { blogPostApi, blogPostListCache } = React.useContext(RepositoryContext);
  const [[blogPosts, isLoading], set] = React.useState<[BlogPost[], boolean]>(blogPostListCache.has(currentLocale)
  ? [blogPostListCache.get(currentLocale), false]
  : [[], true]
);

  React.useEffect(() => {
    if (blogPosts.length === 0 && isLoading === true) {
      blogPostApi.getAllByLocale(currentLocale)
        .then(blogPosts => {
          blogPostListCache.set(currentLocale, blogPosts);

          set([blogPosts, false]);
        })
        .catch(() => set([[], false]));
    }
  }, [currentLocale]);

  return [blogPosts, isLoading];
}
