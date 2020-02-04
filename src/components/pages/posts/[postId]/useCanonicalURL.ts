import { useRouter } from "next/router";

export default function useCanonicalURL(): URL {
  const router = useRouter();
  const canonicalURL = new URL(router.asPath, process.env.ORIGIN);

  for (const key of canonicalURL.searchParams.keys()) {
    if (key !== "hl") {
      canonicalURL.searchParams.delete(key);
    }
  }

  return canonicalURL;
}
