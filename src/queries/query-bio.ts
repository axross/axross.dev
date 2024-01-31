import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { type Bio } from "~/models/bio";
import { findBio } from "~/repositories/find-bio";

export async function queryBio({
  fallback,
}: {
  fallback?: boolean;
}): Promise<Bio | null> {
  const locale = resolveRequestedLocale();
  const bio = await findBio({ locale, fallback });

  return bio;
}
