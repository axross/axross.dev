import * as React from "react";
import LocaleContext from "../../../contexts/LocaleContext";
import RepositoryContext from "../../../contexts/RepositoryContext";

export default function useBio(): [string | null, boolean] {
  type State = [string | null, boolean];

  const { bioCache, bioApi } = React.useContext(RepositoryContext);
  const { currentLocale } = React.useContext(LocaleContext);
  const [[bio, isLoading], set] = React.useState<State>(() => {
    if (bioCache.has(currentLocale)) {
      return [bioCache.get(currentLocale), false];
    }

    return [null, true];
  });

  React.useEffect(() => {
    if (bioCache.has(currentLocale)) {
      const nextBlogPostCache = bioCache.get(currentLocale);

      if (nextBlogPostCache !== bio) {
        set([nextBlogPostCache, false]);
      }
    } else {
      if (!isLoading) {
        set([bio, true]);
      }

      bioApi
        .getByLocale(currentLocale)
        .then(bio => {
          bioCache.set(currentLocale, bio);

          set([bio, false]);
        })
        .catch(() => set([null, false]));
    }
  }, [currentLocale]);

  return [bio, isLoading];
}
