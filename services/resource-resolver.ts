import cheerio from "cheerio";
import * as dateFns from "date-fns";
import imageSize from "image-size";
import Redis from "ioredis";
import { v5 } from "uuid";

export async function scrapeWebpage(
  url: string,
  {
    titleFallback = "",
    descriptionFallback = "",
    imageSrcFallback = "",
  }: {
    titleFallback?: string;
    descriptionFallback?: string;
    imageSrcFallback?: string;
  } = {}
): Promise<{
  href: string;
  title: string;
  description: string;
  imageSrc: string;
}> {
  const redis = new Redis(process.env.CACHE_REDIS_URL);
  const key = `webpage-embed#${v5(url, v5.URL)}`;
  const record = await redis.hgetall(key);

  if (record) {
    const { href, title, description, imageSrc, lastUpdatedAt } = record as any;

    if (
      dateFns.isAfter(new Date(lastUpdatedAt), dateFns.subHours(new Date(), 24))
    ) {
      return { href, title, description, imageSrc };
    }
  }

  let html!: string;

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
        accept: "text/html",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${url} responded ${response.status}.`);
    }

    if (!response.headers.get("content-type")?.includes("text/html")) {
      throw new Error(
        `${url} responded ${response.headers.get("content-type")}.`
      );
    }

    html = await response.text();
  } catch (error) {
    throw error;
  }

  const $ = cheerio.load(html);
  const baseUrl = $("base").attr("href") ?? new URL(url).origin;

  const href = $("meta[property='og:url']").attr("content") ?? url;
  const titleCandidates = [
    $("meta[property='og:title']").attr("content"),
    $("title").text(),
  ];
  const descriptionCandidates = [
    $("meta[property='og:description']").attr("content"),
    $("meta[name='description']").attr("content"),
  ];
  const imageSrcCandidates = [
    $("meta[property='og:image:secure_url']").attr("content"),
    $("meta[property='og:image']").attr("content"),
    $("link[rel='apple-touch-icon-precomposed']").attr("href"),
    $("link[rel='apple-touch-icon-precomposed']").attr("href"),
    $("link[rel='apple-touch-icon-precomposed']").attr("href"),
    $("link[rel='shortcut icon']").attr("href"),
    $("link[rel='icon']").attr("href"),
    "/favicon.ico",
  ].map((imageSrc) =>
    imageSrc?.startsWith("/") ? new URL(imageSrc, baseUrl).href : imageSrc
  );

  const title = chooseBestCandidate(titleCandidates, titleFallback);
  const description = chooseBestCandidate(
    descriptionCandidates,
    descriptionFallback
  );
  const imageSrc = chooseBestCandidate(imageSrcCandidates, imageSrcFallback);

  await redis.hset(key, {
    href,
    title,
    description,
    imageSrc,
    lastUpdatedAt: new Date().toISOString(),
  });

  return { href, title, description, imageSrc };
}

function chooseBestCandidate(
  candidates: (string | undefined)[],
  fallback: string
): string {
  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      continue;
    }

    // prefer fallback item rather than placeholder item in single page apps
    if (/^[^a-z]*loading[^a-z]*$/i.test(candidate)) {
      continue;
    }

    return candidate.trim();
  }

  return fallback;
}

export async function resolveImageDimension(
  url: string
): Promise<[number, number] | null> {
  const redis = new Redis(process.env.CACHE_REDIS_URL);
  const key = `image-dimension#${v5(url, v5.URL)}`;
  const record = await redis.hgetall(key);

  if (record) {
    const { width, height, lastUpdatedAt } = record as any;

    if (
      dateFns.isAfter(
        new Date(lastUpdatedAt),
        dateFns.subHours(new Date(), 24)
      ) &&
      width !== undefined &&
      height !== undefined
    ) {
      return [width, height];
    }
  }

  const response = await fetch(url);
  const { width, height } = imageSize(await (response as any).buffer());

  if (width !== undefined && height !== undefined) {
    await redis.hset(key, {
      width,
      height,
      lastUpdatedAt: new Date().toISOString(),
    });

    return [width, height];
  }

  await redis.hset(url, {
    lastUpdatedAt: new Date().toISOString(),
  });

  return null;
}
