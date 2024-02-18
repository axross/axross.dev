import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getConfig } from "~/helpers/config";
import { type Post } from "~/models/post";
import { queryPost } from "~/queries/query-post";

// `export cons runtime = "edge"` is mandatory because this is statically detected
// `export { runtime }` won't work
// eslint-disable-next-line import/group-exports
export const runtime = "edge";

const size = {
  width: 800,
  height: 415,
};

const contentType = "image/png";

interface RouteParameters {
  slug: Post["slug"];
}

async function getNotoSansJpSemiBold(): Promise<ArrayBuffer> {
  const response = await fetch(
    new URL("~/assets/noto-sans-jp-semibold.ttf", import.meta.url),
  );
  const buffer = await response.arrayBuffer();

  return buffer;
}

async function getCardCharacters(): Promise<ArrayBuffer> {
  const response = await fetch(
    new URL("~/assets/card-characters.ttf", import.meta.url),
  );
  const buffer = await response.arrayBuffer();

  return buffer;
}

async function getBoxesDataUri(): Promise<string> {
  const response = await fetch(new URL("~/assets/chaos.svg", import.meta.url));
  const svg = await response.text();

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
    notFound();
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
          backgroundImage: `url(${await getBoxesDataUri()})`,
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
