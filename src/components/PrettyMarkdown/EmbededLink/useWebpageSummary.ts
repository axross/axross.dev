import * as React from "react";
import WebpageSummary from "../../../entities/WebpageSummary";
import useRepository from "../../../hooks/useRepository";

export default function useWebpageSummary(url: URL): [WebpageSummary | null, boolean] {
  const { webpageSummaryApi } = useRepository();
  const [[webpageSummary, isLoading], set] = React.useState<[WebpageSummary | null, boolean]>([null, true]);

  React.useEffect(() => {
    webpageSummaryApi.getByURL(url)
      .then(webpageSummary => set([webpageSummary, false]))
      .catch(() => set([null, false]));
  }, [url.href]);

  return [webpageSummary, isLoading];
}
