import "server-only";

import { type CheerioAPI, load as loadAsCheerio } from "cheerio";
import { hashSync } from "hasha";
import { type ComponentPropsWithoutRef, type JSX } from "react";
import { fallbackLocale } from "~/helpers/locale";
import { Bookmark } from "./bookmark";

function toAbsolutePath(path: string, url: string): string {
  if (!/^https:\/\//u.test(path)) {
    if (path.startsWith("/")) {
      return new URL(path, new URL(url).origin).toString();
    }
    return `${url.replace(/\/$/u, "")}/${url.replace(/^\//u, "")}`;
  }

  return path;
}

function getUrl(cheerio: CheerioAPI, url: string): string {
  return cheerio('meta[property="og:url"]').attr("content") ?? url;
}

function getTitle(cheerio: CheerioAPI): string | null {
  return (
    cheerio('meta[property="og:title"]').attr("content") ??
    cheerio("title").text() ??
    null
  );
}

function getDescription(cheerio: CheerioAPI): string | null {
  return (
    cheerio('meta[property="og:description"]').attr("content") ??
    cheerio('meta[name="description"]').attr("content") ??
    null
  );
}

function getImageUrl(cheerio: CheerioAPI, url: string): string | null {
  const maybePath =
    cheerio('meta[property="og:image"]').attr("content") ?? null;

  if (maybePath === null) {
    return maybePath;
  }

  return toAbsolutePath(maybePath, url);
}

function getIconImageUrl(cheerio: CheerioAPI, url: string): string | null {
  const maybePath =
    cheerio('link[rel="apple-touch-icon"]').attr("href") ??
    cheerio('link[rel="icon"][sizes="32x32"]').attr("href") ??
    cheerio('link[rel="icon"]').attr("href") ??
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "accept-language": `${locale},${fallbackLocale};q=0.1`,
      referer: "https://www.google.com/",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    },
  });
  const html = await response.text();
  const cheerio = loadAsCheerio(html);
  const resolvedUrl = getUrl(cheerio, response.url);
  const title = getTitle(cheerio);
  const description = getDescription(cheerio);
  const imageUrl = getImageUrl(cheerio, resolvedUrl);
  const iconImageUrl = getIconImageUrl(cheerio, resolvedUrl);

  let proxyImageUrl: string | null = null;
  let proxyIconImageUrl: string | null = null;

  if (imageUrl !== null) {
    const encodedUrl = encodeURIComponent(imageUrl);
    const token = hashSync(`${imageUrl}@asdf1234`);

    proxyImageUrl = `/images/${encodedUrl}?token=${token}`;
  }

  if (iconImageUrl !== null) {
    const encodedUrl = encodeURIComponent(iconImageUrl);
    const token = hashSync(`${iconImageUrl}@asdf1234`);

    proxyIconImageUrl = `/images/${encodedUrl}?token=${token}`;
  }

  return {
    url: resolvedUrl,
    title,
    description,
    imageUrl: proxyImageUrl,
    iconImageUrl: proxyIconImageUrl,
  };
}

async function ServerResolvedBookmark({
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
      iconImageSrc={iconImageUrl ?? undefined}
      {...props}
    />
  );
}

export { ServerResolvedBookmark };
