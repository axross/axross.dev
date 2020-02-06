import * as React from "react";
import LocaleContext from "../../../../contexts/LocaleContext";
import BlogPost, { BlogPostId } from "../../../../entities/BlogPost";
import useRepository from "../../../../hooks/useRepository";

export default function useBlogPost(blogPostId: BlogPostId): [BlogPost | null, boolean] {
  type State = [BlogPost | null, boolean];

  const { blogPostCache, blogPostApi } = useRepository();
  const { currentLocale } = React.useContext(LocaleContext);
  const [[blogPost, isLoading], set] = React.useState<State>(() => {
    if (blogPostCache.has(blogPostId, currentLocale)) {
      return [blogPostCache.get(blogPostId, currentLocale), false];
    }

    return [null, true];
  });

  React.useEffect(() => {
    if (blogPostCache.has(blogPostId, currentLocale)) {
      const nextBlogPostCache = blogPostCache.get(blogPostId, currentLocale);

      if (nextBlogPostCache !== blogPost) {
        set([nextBlogPostCache, false]);
      }
    } else {
      if (!isLoading) {
        set([blogPost, true]);
      }

      blogPostApi
        .getByIdAndLocale(blogPostId, currentLocale)
        .then(blogPost => {
          blogPostCache.set(blogPostId, currentLocale, blogPost);

          set([blogPost, false]);
        })
        .catch(() => set([null, false]));
    }
  }, [blogPostId, currentLocale]);

  return [blogPost, isLoading];
}
