import * as React from "react";
import LocaleContext from "../../contexts/LocaleContext";
import RepositoryContext from "../../contexts/RepositoryContext";

export default function useBio(): [string | null, boolean] {
  const { currentLocale } = React.useContext(LocaleContext);
  const { bioRepository } = React.useContext(RepositoryContext);
  const [[bio, isLoading], set] = React.useState<[string | null, boolean]>([null, true]);

  React.useEffect(() => {
    bioRepository.getByLocale(currentLocale)
      .then(bio => set([bio, false]))
      .catch(() => set([null, false]))
  }, [currentLocale]);

  return [bio, isLoading];
}
