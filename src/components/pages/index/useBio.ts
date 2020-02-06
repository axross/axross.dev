import * as React from "react";
import useLocale from "../../../hooks/useLocale";
import useRepository from "../../../hooks/useRepository";

export default function useBio(): [string | null, boolean] {
  type State = [string | null, boolean];

  const { bioCache, bioApi } = useRepository();
  const { currentLocale } = useLocale();
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
