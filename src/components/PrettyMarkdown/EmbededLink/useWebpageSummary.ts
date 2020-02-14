import { useQuery } from "react-query";
import WebpageSummary from "../../../entities/WebpageSummary";
import useRepository from "../../../hooks/useRepository";

export default function useWebpageSummary({ url }: { url: URL }): [WebpageSummary | null, boolean] {
  const { getWebpageSummary } = useRepository();

  const { data: websitePurpose, isLoading } = useQuery(
  // TODO:
  // send error to sentry later
    ["webpage-summary", { url }],
    getWebpageSummary,
    { initialData: null },
  );

  return [websitePurpose as null, isLoading];
}
