import * as React from "react";
import RepositoryContext from "../../../contexts/RepositoryContext";
import WebpageSummary from "../../../entities/WebpageSummary";

export default function useWebpageSummary(url: URL): [WebpageSummary | null, boolean] {
  const { webpageSummaryRepository } = React.useContext(RepositoryContext);
  const [[webpageSummary, isLoading], set] = React.useState<[WebpageSummary | null, boolean]>([null, true]);

  React.useEffect(() => {
    webpageSummaryRepository.getByURL(url)
      .then(webpageSummary => set([webpageSummary, false]))
      .catch(() => set([null, false]));
  }, [url.href]);

  return [webpageSummary, isLoading];
}
