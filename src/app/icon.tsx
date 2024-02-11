import { ImageResponse } from "next/og";

const contentType = "image/png";

const size = {
  width: 256,
  height: 256,
};

function Icon(): Response {
  return new ImageResponse(
    (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M13.0292 39.8802H20.9708L17 18.7978L13.0292 39.8802ZM13.8358 51.5652V57.8095H0V51.5652H4.5292L13.0912 6H20.8467L29.4708 51.5652H34V57.8095H20.1642V51.5652H23.1423L22.1496 46.1246H11.8504L10.8577 51.5652H13.8358Z"
          fill="#191919"
          fillRule="nonzero"
        />

        <path
          d="M45.0623 28V39.8294L33.8142 36.1744L32 41.7582L43.2488 45.4138L36.2956 54.9838L41.0481 58.4344L48.0013 48.8663L54.9526 58.4345L59.7031 54.9838L52.7494 45.4163L64 41.7607L62.1858 36.1766L50.9352 39.8318V28.0024H45.0624L45.0623 28Z"
          fill="#191919"
          fillRule="nonzero"
        />
      </svg>
    ),
    { ...size },
  );
}

export { contentType };
export default Icon;
