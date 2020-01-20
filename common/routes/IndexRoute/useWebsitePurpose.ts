import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";

export default function useWebsitePurpose(): [string | null, boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { websitePurposeRepository } = React.useContext(RepositoryContext);
  const [[websitePurpose, isLoading], set] = React.useState<[string | null, boolean]>([null, true]);

  React.useEffect(() => {
    websitePurposeRepository.getByLocale(currentLocale)
      .then(websitePurpose => set([websitePurpose, false]))
      .catch(() => set([null, false]));
  }, [currentLocale]);

  return [websitePurpose, isLoading];
}
