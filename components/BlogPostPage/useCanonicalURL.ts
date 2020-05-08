import useURL from "../../hooks/useURL";

export default function useCanonicalURL(): URL {
  const url = new URL(useURL().href);

  for (const key of url.searchParams.keys()) {
    if (key !== "hl") {
      url.searchParams.delete(key);
    }
  }

  return url;
}
