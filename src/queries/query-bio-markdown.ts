import "server-only";

import { resolveRequestedLocale } from "~/helpers/header";
import { getMarkdownFromNotionPage } from "~/helpers/notion";
import { findBio } from "~/repositories/find-bio";

export async function queryBioMarkdown({
  fallback,
}: {
  fallback?: boolean;
}): Promise<string | null> {
  const locale = resolveRequestedLocale();
  const bio = await findBio({ locale, fallback });

  if (bio === null) {
    return null;
  }

  return getMarkdownFromNotionPage({ pageId: bio.id });
}
