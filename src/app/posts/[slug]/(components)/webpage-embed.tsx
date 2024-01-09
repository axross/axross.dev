import { join as joinPath } from "node:path";
import { type CheerioAPI, load as loadAsCheerio } from "cheerio";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { Bookmark } from "~/components/bookmark";
// import { getServerLocale } from "~/helpers/locale";
import { fallbackLocale } from "~/helpers/locale";

function toAbsolutePath(path: string, url: string): string {
  if (!/^https:\/\//.test(path)) {
    if (path.startsWith("/")) {
      return new URL(path, new URL(url).origin).toString();
    }
    return joinPath(url, path);
  }

  return path;
}

function getUrl($: CheerioAPI, url: string): string {
  return $('meta[property="og:url"]').attr("content") ?? url;
}

function getTitle($: CheerioAPI): string | null {
  return (
    $('meta[property="og:title"]').attr("content") ?? $("title").text() ?? null
  );
}

function getDescription($: CheerioAPI): string | null {
  return (
    $('meta[property="og:description"]').attr("content") ??
    $('meta[name="description"]').attr("content") ??
    null
  );
}

function getImageUrl($: CheerioAPI, url: string): string | null {
  const maybePath = $('meta[property="og:image"]').attr("content") ?? null;

  if (maybePath === null) {
    return maybePath;
  }

  return toAbsolutePath(maybePath, url);
}

function getIconImageUrl($: CheerioAPI, url: string): string | null {
  const maybePath =
    $('link[rel="apple-touch-icon"]').attr("href") ??
    $('link[rel="icon"][sizes="32x32"]').attr("href") ??
    $('link[rel="icon"]').attr("href") ??
    null;

  if (maybePath === null) {
    return maybePath;
  }

  return toAbsolutePath(maybePath, url);
}

async function getWebpageMetadata(url: string): Promise<{
  url: string;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  iconImageUrl: string | null;
}> {
  // const locale = getServerLocale();
  const locale = "en-US";
  const response = await fetch(url, {
    headers: {
      accept: "text/html",
      "accept-language": `${locale},${fallbackLocale};q=0.1`,
      referer: "https://www.google.com/",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    },
  });
  const html = await response.text();
  const $ = loadAsCheerio(html);
  const resolvedUrl = getUrl($, response.url);
  const title = getTitle($);
  const description = getDescription($);
  const imageUrl = getImageUrl($, resolvedUrl);
  const iconImageUrl = getIconImageUrl($, resolvedUrl);

  return {
    url: resolvedUrl,
    title,
    description,
    imageUrl: imageUrl
      ? `/embeded-webpages/${encodeURIComponent(imageUrl)}`
      : null,
    iconImageUrl: iconImageUrl
      ? `/embeded-webpages/${encodeURIComponent(iconImageUrl)}`
      : null,
  };
}

async function WebpageEmbed({
  href,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof Bookmark>,
  "description" | "imageSrc" | "title"
>): Promise<JSX.Element> {
  const { title, description, imageUrl, iconImageUrl } =
    await getWebpageMetadata(href);

  return (
    <Bookmark
      href={href}
      title={title ?? undefined}
      description={description ?? undefined}
      imageSrc={imageUrl ?? undefined}
      iconImageUrl={iconImageUrl ?? undefined}
      {...props}
    />
  );
}

export { WebpageEmbed };
