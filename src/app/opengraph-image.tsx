import { ImageResponse } from "next/og";
import { backgroundPattern, dotGothic16 } from "~/assets/image-response";
import { getConfig } from "~/helpers/config";

const size = {
  width: 800,
  height: 415,
};

const contentType = "image/png";

function Image(): Response {
  const config = getConfig();

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
            paddingTop: 10,
            backgroundColor: "#fff",
            borderRadius: 16,
            fontSize: 80,
            fontWeight: 600,
            fontFamily: "Dot Gothic 16",
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
          name: "Dot Gothic 16",
          data: dotGothic16,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

export { size, contentType };

export default Image;
