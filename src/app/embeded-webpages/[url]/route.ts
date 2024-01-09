import { type NextRequest } from "next/server";
import sharp from "sharp";

function isImageResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type");

  if (contentType === null) {
    return false;
  }

  return (
    contentType.startsWith("image/webp") ||
    contentType.startsWith("image/png") ||
    contentType.startsWith("image/jpeg") ||
    contentType.startsWith("image/gif")
  );
}

interface RouteParameters {
  url: string;
}

async function GET(
  request: NextRequest,
  { params: { url } }: { params: RouteParameters }
): Promise<Response> {
  const response = await fetch(url);

  if (isImageResponse(response)) {
    const buffer = await response.arrayBuffer();
    const converted = await sharp(buffer)
      .resize({ width: 1280 })
      .webp()
      .toBuffer();

    return new Response(converted, {
      headers: {
        "content-type": "image/webp",
        "content-size": `${converted.byteLength}`,
      },
    });
  }

  return new Response(null, { status: 400 });
}

export { GET };
