import { formatRFC3339, isAfter } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";
import { getConfig } from "~/helpers/config";
import { availableLocales, fallbackLocale } from "~/helpers/locale";
import { type Locale } from "~/models/locale";
import { queryPosts } from "~/queries/query-posts";

const found = 302;

async function GET(request: NextRequest): Promise<Response> {
  const config = getConfig();
  const maybeLocale = request.nextUrl.searchParams.get("locale");

  let locale = null;

  if (availableLocales.includes(maybeLocale as never)) {
    locale = maybeLocale as Locale;
  }

  if (locale === null) {
    const redirectUrl = new URL(request.nextUrl.toString());
    redirectUrl.searchParams.set("locale", fallbackLocale);

    return NextResponse.redirect(redirectUrl, found);
  }

  const posts = await queryPosts({ locale });

  let atomEntries = "";
  let lastEditedAt = new Date("2024-02-01T00:00:00.000Z");

  for (const post of posts) {
    atomEntries += "  <entry>\n";
    atomEntries += `    <id>tag:www.axross.dev,2024:posts/${post.slug}</id>\n`;
    atomEntries += `    <title>${post.title}</title>\n`;
    atomEntries += `    <author><name>${post.createdBy.name}</name></author>\n`;
    atomEntries += `    <link href="${config.website.urlOrigin}/posts/${post.slug}"/>\n`;
    atomEntries += `    <updated>${formatRFC3339(post.lastEditedAt)}</updated>\n`;
    atomEntries += `    <summary>${post.summary}</summary>\n`;
    atomEntries += `  </entry>\n`;

    if (isAfter(post.lastEditedAt, lastEditedAt)) {
      lastEditedAt = post.lastEditedAt;
    }
  }

  let atom = "";

  atom += '<?xml version="1.0" encoding="utf-8"?>\n';
  atom += '<feed xmlns="http://www.w3.org/2005/Atom">\n';
  atom += "  <id>tag:www.axross.dev,2024:posts</id>\n";
  atom += `  <title>Posts at ${config.website.title}</title>\n`;
  atom += `  <link href="${config.website.urlOrigin}/posts.xml?locale=${locale}" rel="self" type="application/atom+xml" />\n`;

  for (const availableLocale of availableLocales) {
    if (availableLocale === locale) {
      continue;
    }

    atom += `  <link href="${config.website.urlOrigin}/posts.xml?locale=${availableLocale}" rel="alternate" type="application/atom+xml" />\n`;
  }

  atom += `  <link href="${config.website.urlOrigin}/" rel="alternate" type="text/html" />\n`;
  atom += `  <updated>${formatRFC3339(lastEditedAt)}</updated>\n`;
  atom += "\n";

  atom += atomEntries;

  atom += `</feed>\n`;

  return new Response(atom);
}

export { GET };
