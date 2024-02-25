import { readFile } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { ImageResponse } from "next/og";
import { getConfig } from "~/helpers/config";

// eslint-disable-next-line import/group-exports
export const runtime = "nodejs";

const size = {
  width: 800,
  height: 415,
};

const contentType = "image/png";

async function getCardCharacters(): Promise<Buffer> {
  const buffer = await promisify(readFile)(
    resolve(fileURLToPath(import.meta.url), "../../assets/card-characters.ttf"),
  );

  return buffer as never;
}

async function getChaosDataUri(): Promise<string> {
  const svg = await promisify(readFile)(
    resolve(fileURLToPath(import.meta.url), "../../assets/chaos.svg"),
    "utf8",
  );

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
          backgroundImage: `url(${await getChaosDataUri()})`,
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
