import { ImageResponse } from "next/og";
import { getConfig } from "~/helpers/config";

// `export cons runtime = "edge"` is mandatory because this is statically detected
// `export { runtime }` won't work
// eslint-disable-next-line import/group-exports
export const runtime = "edge";

const size = {
  width: 800,
  height: 415,
};

const contentType = "image/png";

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

async function Image(): Promise<Response> {
  const config = getConfig();

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
          padding: 40,
          backgroundColor: "#121113",
          backgroundImage: `url(${await getBoxesDataUri()})`,
          backgroundPosition: "3%",
          backgroundSize: "738px 415px",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 64,
            fontWeight: 600,
            fontFamily: "Card Characters",
          }}
        >
          {config.website.title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
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
