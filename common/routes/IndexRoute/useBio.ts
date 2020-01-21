import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";

export default function useBio(): [string | null, boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { bioApi, bioCache } = React.useContext(RepositoryContext);
  const [[bio, isLoading], set] = React.useState<[string | null, boolean]>(bioCache.has(currentLocale)
    ? [bioCache.get(currentLocale), false]
    : [null, true]
  );

  React.useEffect(() => {
    if (bio === null) {
      bioApi.getByLocale(currentLocale)
        .then(bio => {
          bioCache.set(currentLocale, bio);

          set([bio, false]);
        })
        .catch(() => set([null, false]));
    }
  }, [currentLocale]);

  return [bio, isLoading];
}
