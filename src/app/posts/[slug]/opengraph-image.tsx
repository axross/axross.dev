import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { backgroundPattern, dotGothic16 } from "~/assets/image-response";
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
          alignItems: "flex-end",
          justifyContent: "center",
          padding: 40,
          backgroundColor: "#1d4ed8",
          backgroundImage: `url(${backgroundPattern})`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: 40,
            gap: 20,
            backgroundColor: "#fff",
            borderRadius: 16,
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
                fontSize: 48,
                fontWeight: 600,
                fontFamily: "Dot Gothic 16",
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
                fontSize: 40,
                fontWeight: 600,
                fontFamily: "Dot Gothic 16",
                lineClamp: 1,
              }}
            >
              {config.website.title}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Dot Gothic 16",
          data: dotGothic16,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

export { size, contentType };

export default Image;
