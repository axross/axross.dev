import { NextPageContext } from "next";
import getURL from "./getURL";

export default function getRequestedLocale(
  context: NextPageContext
): string | null {
  const url = getURL(context);

  return url.searchParams.get("hl")!;
}
