import { readFile } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { ImageResponse } from "next/og";
import { getConfig } from "~/helpers/config";
import { type Post } from "~/models/post";
import { queryPost } from "~/queries/query-post";

const size = {
  width: 800,
  height: 415,
};

const contentType = "image/png";

interface RouteParameters {
  slug: Post["slug"];
}

async function getNotoSansJpSemiBold(): Promise<ArrayBuffer> {
  const buffer = await promisify(readFile)(
    resolve(
      fileURLToPath(import.meta.url),
      "../../../../assets/noto-sans-jp-semibold.ttf",
    ),
  );

  return buffer;
}

async function getCardCharacters(): Promise<ArrayBuffer> {
  const buffer = await promisify(readFile)(
    resolve(
      fileURLToPath(import.meta.url),
      "../../../../assets/card-characters.ttf",
    ),
  );

  return buffer;
}

async function getChaosDataUri(): Promise<string> {
  const svg = await promisify(readFile)(
    resolve(fileURLToPath(import.meta.url), "../../../../assets/chaos.svg"),
    "utf8",
  );

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

async function Image({
  params: { slug },
}: {
  params: RouteParameters;
}): Promise<Response> {
  const config = getConfig();
  const post = await queryPost({ slug, fallback: true });

  if (post === null) {
    return new Response(null, { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: 80,
          backgroundColor: "#121113",
          backgroundImage: `url(${await getChaosDataUri()})`,
          backgroundPosition: "3%",
          backgroundSize: "738px 415px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              display: "block",
              width: "100%",
              margin: 0,
              color: "#fff",
              fontSize: 48,
              fontWeight: 600,
              fontFamily: "Noto Sans JP",
              textAlign: "center",
              lineClamp: 2,
            }}
          >
            {post.title}
          </p>
        </div>

        <div style={{ display: "flex" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: 0,
              width: "100%",
              color: "#fff",
              fontSize: 40,
              fontWeight: 600,
              fontFamily: "Card Characters",
              lineClamp: 1,
            }}
          >
            {config.website.title}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: await getNotoSansJpSemiBold(),
          style: "normal",
          weight: 600,
        },
        {
          name: "Card Characters",
          data: await getCardCharacters(),
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

// eslint-disable-next-line import/group-exports
export { size, contentType };

export default Image;
