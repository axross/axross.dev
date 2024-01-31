import { hashSync } from "hasha";
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

interface RouteParams {
  url: string;
}

async function GET(
  request: NextRequest,
  { params: { url } }: { params: RouteParams }
): Promise<Response> {
  const token = request.nextUrl.searchParams.get("token");

  if (token !== hashSync(`${url}@asdf1234`)) {
    return new Response("Token is malformed.", { status: 400 });
  }

  const response = await fetch(url);

  if (isImageResponse(response)) {
    const buffer = await response.arrayBuffer();
    const converted = await sharp(buffer)
      .resize({ width: 1280 })
      .webp()
      .toBuffer();

    return new Response(converted, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "content-type": "image/webp",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "content-size": `${converted.byteLength}`,
      },
    });
  }

  return new Response(null, { status: 400 });
}

export { GET };
