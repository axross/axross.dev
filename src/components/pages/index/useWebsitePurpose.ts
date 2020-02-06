import * as React from "react";
import LocaleContext from "../../../contexts/LocaleContext";
import useRepository from "../../../hooks/useRepository";

export default function useWebsitePurpose(): [string | null, boolean] {
  type State = [string | null, boolean];

  const { websitePurposeApi, websitePurposeCache } = useRepository();
  const { currentLocale } = React.useContext(LocaleContext);
  const [[websitePurpose, isLoading], set] = React.useState<State>(() => {
    if (websitePurposeCache.has(currentLocale)) {
      return [websitePurposeCache.get(currentLocale), false];
    }

    return [null, true];
  });

  React.useEffect(() => {
    if (websitePurposeCache.has(currentLocale)) {
      const nextBlogPostCache = websitePurposeCache.get(currentLocale);

      if (nextBlogPostCache !== websitePurpose) {
        set([nextBlogPostCache, false]);
      }
    } else {
      if (!isLoading) {
        set([websitePurpose, true]);
      }

      websitePurposeApi
        .getByLocale(currentLocale)
        .then(websitePurpose => {
          websitePurposeCache.set(currentLocale, websitePurpose);

          set([websitePurpose, false]);
        })
        .catch(() => set([null, false]));
    }
  }, [currentLocale]);

  return [websitePurpose, isLoading];
}
