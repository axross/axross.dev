import { useQuery } from "react-query";
import useLocale from "../../hooks/useLocale";
import useRepository from "../../hooks/useRepository";

export default function useWebsitePurpose(): [string | null, boolean] {
  const { getWebsitePurpose } = useRepository();
  const { currentLocale: locale } = useLocale();

  // TODO:
  // catch error and send it to Sentry later
  const { data: websitePurpose, isLoading } = useQuery(
    ["website-purpose", { locale }],
    getWebsitePurpose,
    { initialData: null }
  );

  return [websitePurpose as null, isLoading];
}
