"use client";

const fallbackQuality = 75;

function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const [path, search] = src.split("?");
  const searchParams = new URLSearchParams(search);

  searchParams.set("w", `${width}`);
  searchParams.set("q", `${quality ?? fallbackQuality}`);

  return `${path}?${searchParams.toString()}`;
}

export { imageLoader };
