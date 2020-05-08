import { useQuery } from "react-query";
import useLocale from "../../hooks/useLocale";
import useRepository from "../../hooks/useRepository";

export default function useBio(): [string, boolean] {
  const { getBio } = useRepository();
  const { currentLocale } = useLocale();

  // TODO:
  // catch error and send it to Sentry later
  const { data: bio, isLoading } = useQuery(
    ["bio", { locale: currentLocale }],
    getBio,
    { initialData: null }
  );

  return [bio!, isLoading];
}
