import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";

export default function useWebsitePurpose(): [string | null, boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { websitePurposeApi, websitePurposeCache } = React.useContext(RepositoryContext);
  const [[websitePurpose, isLoading], set] = React.useState<[string | null, boolean]>(websitePurposeCache.has(currentLocale)
    ? [websitePurposeCache.get(currentLocale), false]
    : [null, true]
  );

  React.useEffect(() => {
    if (websitePurpose === null) {
      websitePurposeApi.getByLocale(currentLocale)
        .then(websitePurpose => {
          websitePurposeCache.set(currentLocale, websitePurpose);

          set([websitePurpose, false]);
        })
        .catch(() => set([null, false]));
    }
  }, [currentLocale]);

  return [websitePurpose, isLoading];
}
