import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { type Post } from "~/models/post";
import { queryPost } from "~/queries/query-post";
import { dotGothic16 } from "./assets";

const runtime = "edge";

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
  const post = await queryPost({ slug });

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
          backgroundImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDQgMzA0IiB3aWR0aD0iMzA0IiBoZWlnaHQ9IjMwNCI+PHBhdGggZmlsbD0iIzkzYzVmZCIgZmlsbC1vcGFjaXR5PSIwLjQiIGQ9Ik00NC4xIDIyNGE1IDUgMCAxIDEgMCAySDB2LTJoNDQuMXptMTYwIDQ4YTUgNSAwIDEgMSAwIDJIODJ2LTJoMTIyLjF6bTU3LjgtNDZhNSA1IDAgMSAxIDAtMkgzMDR2MmgtNDIuMXptMCAxNmE1IDUgMCAxIDEgMC0ySDMwNHYyaC00Mi4xem02LjItMTE0YTUgNSAwIDEgMSAwIDJoLTg2LjJhNSA1IDAgMSAxIDAtMmg4Ni4yem0tMjU2LTQ4YTUgNSAwIDEgMSAwIDJIMHYtMmgxMi4xem0xODUuOCAzNGE1IDUgMCAxIDEgMC0yaDg2LjJhNSA1IDAgMSAxIDAgMmgtODYuMnpNMjU4IDEyLjFhNSA1IDAgMSAxLTIgMFYwaDJ2MTIuMXptLTY0IDIwOGE1IDUgMCAxIDEtMiAwdi01NC4yYTUgNSAwIDEgMSAyIDB2NTQuMnptNDgtMTk4LjJWODBoNjJ2MmgtNjRWMjEuOWE1IDUgMCAxIDEgMiAwem0xNiAxNlY2NGg0NnYyaC00OFYzNy45YTUgNSAwIDEgMSAyIDB6bS0xMjggOTZWMjA4aDE2djEyLjFhNSA1IDAgMSAxLTIgMFYyMTBoLTE2di03Ni4xYTUgNSAwIDEgMSAyIDB6bS01LjktMjEuOWE1IDUgMCAxIDEgMCAySDExNHY0OEg4NS45YTUgNSAwIDEgMSAwLTJIMTEydi00OGgxMi4xem0tNi4yIDEzMGE1IDUgMCAxIDEgMC0ySDE3NnYtNzQuMWE1IDUgMCAxIDEgMiAwVjI0MmgtNjAuMXptLTE2LTY0YTUgNSAwIDEgMSAwLTJIMTE0djQ4aDEwLjFhNSA1IDAgMSAxIDAgMkgxMTJ2LTQ4aC0xMC4xek02NiAyODQuMWE1IDUgMCAxIDEtMiAwVjI3NEg1MHYzMGgtMnYtMzJoMTh2MTIuMXpNMjM2LjEgMTc2YTUgNSAwIDEgMSAwIDJIMjI2djk0aDQ4djMyaC0ydi0zMGgtNDh2LTk4aDEyLjF6bTI1LjgtMzBhNSA1IDAgMSAxIDAtMkgyNzR2NDQuMWE1IDUgMCAxIDEtMiAwVjE0NmgtMTAuMXptLTY0IDk2YTUgNSAwIDEgMSAwLTJIMjA4di04MGgxNnYtMTRoLTQyLjFhNSA1IDAgMSAxIDAtMkgyMjZ2MThoLTE2djgwaC0xMi4xem04Ni4yLTIxMGE1IDUgMCAxIDEgMCAySDI3MlYwaDJ2MzJoMTAuMXpNOTggMTAxLjlWMTQ2SDUzLjlhNSA1IDAgMSAxIDAtMkg5NnYtNDIuMWE1IDUgMCAxIDEgMiAwek01My45IDM0YTUgNSAwIDEgMSAwLTJIODBWMGgydjM0SDUzLjl6bTYwLjEgMy45VjY2SDgydjY0SDY5LjlhNSA1IDAgMSAxIDAtMkg4MFY2NGgzMlYzNy45YTUgNSAwIDEgMSAyIDB6TTEwMS45IDgyYTUgNSAwIDEgMSAwLTJIMTI4VjM3LjlhNSA1IDAgMSAxIDIgMFY4MmgtMjguMXptMTYtNjRhNSA1IDAgMSAxIDAtMkgxNDZ2NDQuMWE1IDUgMCAxIDEtMiAwVjE4aC0yNi4xem0xMDIuMiAyNzBhNSA1IDAgMSAxIDAgMkg5OHYxNGgtMnYtMTZoMTI0LjF6TTI0MiAxNDkuOVYxNjBoMTZ2MzRoLTE2djYyaDQ4djQ4aC0ydi00NmgtNDh2LTY2aDE2di0zMGgtMTZ2LTEyLjFhNSA1IDAgMSAxIDIgMHpNNTMuOSAxOGE1IDUgMCAxIDEgMC0ySDY0VjJINDhWMGgxOHYxOEg1My45em0xMTIgMzJhNSA1IDAgMSAxIDAtMkgxOTJWMGg1MHYyaC00OHY0OGgtMjguMXptLTQ4LTQ4YTUgNSAwIDAgMS05LjgtMmgyLjA3YTMgMyAwIDEgMCA1LjY2IDBIMTc4djM0aC0xOFYyMS45YTUgNSAwIDEgMSAyIDBWMzJoMTRWMmgtNTguMXptMCA5NmE1IDUgMCAxIDEgMC0ySDEzN2wzMi0zMmgzOVYyMS45YTUgNSAwIDEgMSAyIDBWNjZoLTQwLjE3bC0zMiAzMkgxMTcuOXptMjguMSA5MC4xYTUgNSAwIDEgMS0yIDB2LTc2LjUxTDE3NS41OSA4MEgyMjRWMjEuOWE1IDUgMCAxIDEgMiAwVjgyaC00OS41OUwxNDYgMTEyLjQxdjc1LjY5em0xNiAzMmE1IDUgMCAxIDEtMiAwdi05OS41MUwxODQuNTkgOTZIMzAwLjFhNSA1IDAgMCAxIDMuOS0zLjl2Mi4wN2EzIDMgMCAwIDAgMCA1LjY2djIuMDdhNSA1IDAgMCAxLTMuOS0zLjlIMTg1LjQxTDE2MiAxMjEuNDF2OTguNjl6bS0xNDQtNjRhNSA1IDAgMSAxLTIgMHYtMy41MWw0OC00OFY0OGgzMlYwaDJ2NTBINjZ2NTUuNDFsLTQ4IDQ4djIuNjl6TTUwIDUzLjl2NDMuNTFsLTQ4IDQ4VjIwOGgyNi4xYTUgNSAwIDEgMSAwIDJIMHYtNjUuNDFsNDgtNDhWNTMuOWE1IDUgMCAxIDEgMiAwem0tMTYgMTZWODkuNDFsLTM0IDM0di0yLjgybDMyLTMyVjY5LjlhNSA1IDAgMSAxIDIgMHpNMTIuMSAzMmE1IDUgMCAxIDEgMCAySDkuNDFMMCA0My40MVY0MC42TDguNTkgMzJoMy41MXptMjY1LjggMThhNSA1IDAgMSAxIDAtMmgxOC42OWw3LjQxLTcuNDF2Mi44MkwyOTcuNDEgNTBIMjc3Ljl6bS0xNiAxNjBhNSA1IDAgMSAxIDAtMkgyODh2LTcxLjQxbDE2LTE2djIuODJsLTE0IDE0VjIxMGgtMjguMXptLTIwOCAzMmE1IDUgMCAxIDEgMC0ySDY0di0yMi41OUw0MC41OSAxOTRIMjEuOWE1IDUgMCAxIDEgMC0ySDQxLjQxTDY2IDIxNi41OVYyNDJINTMuOXptMTUwLjIgMTRhNSA1IDAgMSAxIDAgMkg5NnYtNTYuNkw1Ni42IDE2MkgzNy45YTUgNSAwIDEgMSAwLTJoMTkuNUw5OCAyMDAuNlYyNTZoMTA2LjF6bS0xNTAuMiAyYTUgNSAwIDEgMSAwLTJIODB2LTQ2LjU5TDQ4LjU5IDE3OEgyMS45YTUgNSAwIDEgMSAwLTJINDkuNDFMODIgMjA4LjU5VjI1OEg1My45ek0zNCAzOS44djEuNjFMOS40MSA2Nkgwdi0yaDguNTlMMzIgNDAuNTlWMGgydjM5Ljh6TTIgMzAwLjFhNSA1IDAgMCAxIDMuOSAzLjlIMy44M0EzIDMgMCAwIDAgMCAzMDIuMTdWMjU2aDE4djQ4aC0ydi00NkgydjQyLjF6TTM0IDI0MXY2M2gtMnYtNjJIMHYtMmgzNHYxek0xNyAxOEgwdi0yaDE2VjBoMnYxOGgtMXptMjczLTJoMTR2MmgtMTZWMGgydjE2em0tMzIgMjczdjE1aC0ydi0xNGgtMTR2MTRoLTJ2LTE2aDE4djF6TTAgOTIuMUE1LjAyIDUuMDIgMCAwIDEgNiA5N2E1IDUgMCAwIDEtNiA0Ljl2LTIuMDdhMyAzIDAgMSAwIDAtNS42NlY5Mi4xek04MCAyNzJoMnYzMmgtMnYtMzJ6bTM3LjkgMzJoLTIuMDdhMyAzIDAgMCAwLTUuNjYgMGgtMi4wN2E1IDUgMCAwIDEgOS44IDB6TTUuOSAwQTUuMDIgNS4wMiAwIDAgMSAwIDUuOVYzLjgzQTMgMyAwIDAgMCAzLjgzIDBINS45em0yOTQuMiAwaDIuMDdBMyAzIDAgMCAwIDMwNCAzLjgzVjUuOWE1IDUgMCAwIDEtMy45LTUuOXptMy45IDMwMC4xdjIuMDdhMyAzIDAgMCAwLTEuODMgMS44M2gtMi4wN2E1IDUgMCAwIDEgMy45LTMuOXpNOTcgMTAwYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMC0xNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0wIDE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptLTQ4IDMyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0zMiA0OGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bS0xNiAxNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTMyLTE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMC0zMmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDMyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMzIgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0wLTE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptLTE2LTY0YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYgMGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDk2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMCAxNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYtMTQ0YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMCAzMmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2LTMyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYtMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0tOTYgMGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTAgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0xNi0zMmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTk2IDBhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0tMTYtNjRhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0xNi0xNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bS0zMiAwYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMC0xNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bS0xNiAwYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptLTE2IDBhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0tMTYgMGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6TTQ5IDM2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptLTMyIDBhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0zMiAxNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6TTMzIDY4YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYtNDhhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0wIDI0MGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDMyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptLTE2LTY0YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMCAxNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bS0xNi0zMmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTgwLTE3NmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2IDBhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0tMTYtMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0zMiA0OGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTE2LTE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMC0zMmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTExMiAxNzZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0tMTYgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0wIDE2YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMCAxNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6TTE3IDE4MGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTAgMTZhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0wLTMyYTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMTYgMGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6TTE3IDg0YTMgMyAwIDEgMCAwLTYgMyAzIDAgMCAwIDAgNnptMzIgNjRhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2em0xNi0xNmEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6Ij48L3BhdGg+PC9zdmc+)`,
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
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 30,
            paddingRight: 30,
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

          <div
            style={{
              display: "flex",
              marginTop: 32,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 234 64"
              style={{
                width: 172,
                height: 48,
              }}
            >
              <path
                fill="#1d4ed8"
                d="M1.84 63.872c.455 0 .826-.107 1.111-.32.285-.214.528-.485.727-.812.2-.328.35-.677.45-1.047l.277-1.025c.257-1.026.585-2.144.984-3.354.4-1.21.863-2.428 1.39-3.653a38.524 38.524 0 011.732-3.525 21.37 21.37 0 011.99-2.99c.698-.87 1.418-1.567 2.16-2.094.74-.527 1.496-.79 2.266-.79.741 0 1.369.242 1.882.726.513.484.77 1.11.77 1.88 0 .883-.2 1.702-.599 2.456-.4.755-.955 1.446-1.668 2.073-.713.626-1.561 1.189-2.545 1.687-.984.499-2.06.919-3.23 1.26-.427.143-.762.32-1.004.535a2.447 2.447 0 00-.556.683 2.067 2.067 0 00-.235.662c-.029.2-.043.356-.043.47 0 .883.235 1.745.705 2.585.471.84 1.113 1.595 1.925 2.264.813.67 1.782 1.204 2.909 1.603a10.75 10.75 0 003.614.598c1.625 0 3.215-.307 4.769-.919 1.554-.612 3.044-1.495 4.47-2.649 1.425-1.153 2.75-2.549 3.977-4.187 1.226-1.637 2.338-3.496 3.336-5.575.114-.285.171-.513.171-.684 0-.398-.15-.769-.449-1.11-.3-.342-.691-.513-1.176-.513a1.61 1.61 0 00-.856.235 1.547 1.547 0 00-.598.705c-1.34 2.848-2.723 5.055-4.15 6.622-1.425 1.566-2.772 2.713-4.04 3.44-1.27.725-2.389 1.153-3.358 1.28-.97.129-1.669.193-2.096.193-1.397 0-2.652-.32-3.764-.961-1.112-.641-1.91-1.503-2.395-2.585a22.988 22.988 0 003.742-1.538 15.523 15.523 0 003.23-2.2 10.366 10.366 0 002.266-2.863c.57-1.068.856-2.243.856-3.524 0-.826-.15-1.595-.45-2.308a5.744 5.744 0 00-1.24-1.858 5.75 5.75 0 00-1.86-1.239 5.91 5.91 0 00-2.31-.449c-1.483 0-2.83.442-4.042 1.325-1.212.883-2.302 2.008-3.272 3.375a25.655 25.655 0 00-2.523 4.465 43.793 43.793 0 00-1.754 4.592c.029-1.88.057-4.044.086-6.494.028-2.45.064-5.027.107-7.733l.128-8.33c.043-2.849.085-5.619.128-8.31.043-2.692.086-5.234.129-7.627a3212.602 3212.602 0 00.17-10.574c.015-1.068.022-1.63.022-1.687 0-.484-.157-.876-.47-1.175a1.61 1.61 0 00-1.155-.449c-.4 0-.77.15-1.112.449a1.44 1.44 0 00-.514 1.132c0 .228-.007.933-.021 2.115a2609.358 2609.358 0 01-.171 10.98C.62 19.518.585 22.06.556 24.737a861.978 861.978 0 01-.128 8.246c-.057 2.82-.1 5.56-.129 8.224C.271 43.87.235 46.39.192 48.769a2600.694 2600.694 0 00-.17 10.788c-.012.95-.02 1.562-.021 1.84L0 61.521c0 .855.2 1.46.599 1.816.399.356.812.534 1.24.534zm37.082-.427c1.14 0 2.195-.157 3.165-.47.97-.314 1.846-.74 2.63-1.282a10.133 10.133 0 002.074-1.901 12.532 12.532 0 001.54-2.371c.542.113 1.17.17 1.882.17 1.34.029 2.552-.128 3.636-.47a11.343 11.343 0 002.93-1.388 10.407 10.407 0 002.266-2.05 17.505 17.505 0 001.69-2.457c.114-.228.228-.477.342-.748.114-.27.171-.52.171-.748 0-.484-.164-.876-.492-1.175-.328-.299-.677-.448-1.048-.448-.285 0-.57.078-.855.235-.285.156-.47.32-.556.491-.456.94-.934 1.766-1.433 2.478a7.348 7.348 0 01-1.69 1.752 6.837 6.837 0 01-2.095 1.025c-.77.228-1.64.342-2.61.342h-.555a3.12 3.12 0 01-.514-.043c.229-.997.343-1.95.343-2.862 0-1.738-.157-3.233-.47-4.486-.314-1.254-.735-2.279-1.263-3.076-.527-.798-1.133-1.382-1.817-1.752a4.516 4.516 0 00-2.182-.555c-1.283 0-2.316.512-3.1 1.538-.785 1.025-1.177 2.35-1.177 3.973 0 2.022.542 3.845 1.626 5.469 1.083 1.623 2.466 2.876 4.148 3.76a7.515 7.515 0 01-2.459 2.883c-1.07.755-2.417 1.132-4.042 1.132-.912 0-1.74-.164-2.48-.491a5.785 5.785 0 01-1.925-1.367 5.919 5.919 0 01-1.24-2.094 7.874 7.874 0 01-.428-2.627c0-1.054.142-2.008.427-2.863.285-.854.65-1.595 1.091-2.221a7.613 7.613 0 011.433-1.56 8.225 8.225 0 011.454-.961 6.243 6.243 0 001.133-.705c.3-.242.45-.605.45-1.09 0-.427-.122-.768-.364-1.025-.242-.256-.606-.384-1.09-.384-.428 0-1.07.22-1.925.662-.856.441-1.711 1.11-2.567 2.008-.855.897-1.61 2.022-2.266 3.375-.656 1.353-.984 2.94-.984 4.764 0 1.424.228 2.727.684 3.909.456 1.182 1.098 2.193 1.925 3.033a8.892 8.892 0 002.908 1.966c1.112.47 2.338.705 3.679.705zm7.527-10.126a6.448 6.448 0 01-1.56-1.346 8.932 8.932 0 01-1.113-1.666 7.89 7.89 0 01-.663-1.773 7.375 7.375 0 01-.214-1.709c0-.854.143-1.41.428-1.666.285-.256.513-.385.684-.385.428 0 .799.207 1.112.62.314.413.578.954.792 1.623.213.67.377 1.403.492 2.2.114.798.17 1.581.17 2.35 0 .57-.042 1.154-.128 1.752zm34.987 9.698c1.14 0 2.231-.277 3.272-.833a12.944 12.944 0 002.908-2.136 21.33 21.33 0 002.46-2.841 38.621 38.621 0 001.946-2.948c.556-.94.998-1.766 1.326-2.478.328-.712.549-1.182.663-1.41.085-.2.128-.413.128-.64 0-.4-.143-.77-.428-1.112-.285-.341-.67-.512-1.155-.512-.712 0-1.211.327-1.497.982-.228.485-.527 1.09-.898 1.816a31.72 31.72 0 01-1.283 2.265 29.017 29.017 0 01-1.625 2.35 19.749 19.749 0 01-1.882 2.136c-.656.64-1.326 1.153-2.01 1.538-.685.384-1.369.576-2.053.576-.6 0-1.084-.163-1.455-.491-.37-.328-.648-.755-.834-1.282a7.95 7.95 0 01-.385-1.794 19.15 19.15 0 01-.106-2.03 29.6 29.6 0 01.192-3.439c.128-1.096.192-1.972.192-2.627 0-.798-.092-1.538-.278-2.222a5.75 5.75 0 00-.812-1.794 3.882 3.882 0 00-1.369-1.218c-.556-.299-1.205-.448-1.946-.448-.741 0-1.533.22-2.374.662-.84.441-1.675 1.16-2.502 2.157a42.498 42.498 0 00-2.395 3.29 71.394 71.394 0 00-2.181 3.525 111.019 111.019 0 00-1.925 3.46 72.418 72.418 0 00-1.583 3.14l-.042-2.007v-7.477a153.76 153.76 0 004.32-8.523 83.245 83.245 0 003.592-8.994 72.58 72.58 0 002.46-9.463c.613-3.233.92-6.53.92-9.89 0-1.653-.115-3.226-.343-4.722-.228-1.495-.599-2.805-1.112-3.93-.513-1.125-1.183-2.015-2.01-2.67C68.505.328 67.492 0 66.295 0c-1.397 0-2.56.655-3.486 1.965-.927 1.31-1.69 3.169-2.288 5.576-.599 2.406-1.048 5.312-1.347 8.715-.3 3.404-.514 7.206-.642 11.408-.128 4.2-.2 8.744-.214 13.628-.014 4.885-.021 10.02-.021 15.402v2.692c0 .997.235 1.844.706 2.542.47.698 1.147 1.047 2.031 1.047.485 0 1.034-.207 1.647-.62.613-.413 1.219-1.217 1.818-2.414.313-.626.712-1.417 1.197-2.37a73.562 73.562 0 011.626-3.013 152.355 152.355 0 011.86-3.183 33.763 33.763 0 011.925-2.884c.641-.854 1.254-1.545 1.839-2.072.584-.527 1.105-.79 1.561-.79.314 0 .592.156.834.47.242.313.364.911.364 1.794 0 .342-.022.762-.065 1.26-.042.499-.092 1.033-.15 1.603-.056.57-.106 1.146-.149 1.73a22.584 22.584 0 00-.064 1.645c0 .997.078 2.022.235 3.076.157 1.054.456 2.008.898 2.862a5.773 5.773 0 001.86 2.115c.8.556 1.854.833 3.166.833zM61.549 37.13c.004-1.58.017-3.255.041-5.023.029-2.122.079-4.308.15-6.558s.178-4.444.32-6.58c.143-2.136.329-4.158.557-6.066.228-1.909.513-3.582.855-5.02.342-1.439.741-2.578 1.198-3.418.456-.84.998-1.26 1.625-1.26.798 0 1.419.384 1.86 1.153.443.769.77 1.666.984 2.691.214 1.026.342 2.037.385 3.034.043.997.064 1.723.064 2.179 0 2.762-.2 5.418-.598 7.968-.4 2.549-.949 5.062-1.647 7.54a77.812 77.812 0 01-2.524 7.456 158.256 158.256 0 01-3.272 7.669l.002-5.765zm40.46 26.443c2.937-.057 5.567-1.182 7.891-3.375 2.324-2.194 4.47-5.455 6.437-9.784a1.336 1.336 0 00.171-.684c0-.398-.15-.769-.449-1.11-.3-.342-.691-.513-1.176-.513a1.61 1.61 0 00-.856.235 1.547 1.547 0 00-.598.705 52.753 52.753 0 01-2.01 4.016 21.068 21.068 0 01-2.524 3.631c-.941 1.083-1.982 1.958-3.122 2.628-1.14.67-2.41 1.004-3.807 1.004-1.369 0-2.523-.25-3.464-.748a6.65 6.65 0 01-2.31-1.987 18.373 18.373 0 003.122-1.922c.97-.74 1.804-1.552 2.502-2.435a11.06 11.06 0 001.647-2.863c.4-1.025.599-2.122.599-3.29 0-.911-.157-1.723-.47-2.435a5.7 5.7 0 00-1.241-1.816 5.585 5.585 0 00-1.732-1.153 4.968 4.968 0 00-1.946-.406c-1.112 0-2.132.256-3.058.77-.927.512-1.726 1.224-2.396 2.135-.67.912-1.183 1.98-1.54 3.205-.356 1.224-.534 2.563-.534 4.016 0 1.452.214 2.905.642 4.357a11.88 11.88 0 001.967 3.91c.884 1.153 2.01 2.093 3.379 2.82 1.369.726 2.994 1.089 4.876 1.089zm-7.1-8.759a17.03 17.03 0 01-.364-1.623 9.42 9.42 0 01-.15-1.624c0-.826.079-1.659.236-2.499a8.61 8.61 0 01.748-2.286c.342-.683.784-1.239 1.326-1.666.542-.427 1.198-.64 1.968-.64.57 0 1.069.22 1.497.662.427.441.641 1.089.641 1.943 0 .77-.142 1.531-.428 2.286a8.716 8.716 0 01-1.197 2.158 10.431 10.431 0 01-4.277 3.29zm21.6-22.173c1.083 0 2.002-.378 2.758-1.132.755-.755 1.133-1.674 1.133-2.756a3.84 3.84 0 00-1.133-2.756 3.85 3.85 0 00-2.759-1.132 3.85 3.85 0 00-2.759 1.132 3.84 3.84 0 00-1.133 2.756c0 1.082.378 2 1.133 2.756.756.754 1.676 1.132 2.76 1.132zm0-2.435a1.4 1.4 0 01-1.027-.428 1.398 1.398 0 01-.428-1.025c0-.399.142-.748.428-1.047.285-.299.627-.448 1.026-.448.4 0 .749.15 1.048.448.3.3.45.648.45 1.047 0 .399-.15.74-.45 1.025-.3.285-.649.428-1.048.428zM121.298 64c.997 0 1.981-.242 2.95-.726a12.86 12.86 0 002.78-1.902 21.163 21.163 0 002.503-2.648 41.43 41.43 0 003.914-5.874c.513-.94.94-1.738 1.283-2.393.114-.2.17-.442.17-.727 0-.398-.149-.769-.448-1.11a1.442 1.442 0 00-1.134-.513 1.59 1.59 0 00-1.454.897 54.653 54.653 0 01-2.695 4.806c-.912 1.439-1.817 2.67-2.716 3.696-.898 1.025-1.775 1.823-2.63 2.393-.855.57-1.682.854-2.48.854-.485 0-.992-.085-1.52-.256-.527-.171-1.026-.513-1.496-1.026-.47-.512-.856-1.232-1.155-2.157-.3-.926-.449-2.144-.449-3.653 0-1.11.036-2.329.107-3.653.071-1.324.157-2.578.257-3.76l.256-3.054c.071-.855.107-1.368.107-1.538 0-.428-.142-.805-.428-1.133a1.36 1.36 0 00-1.069-.491c-.485 0-.877.15-1.176.449-.3.299-.478.648-.535 1.046a97.978 97.978 0 00-.77 12.262c0 1.424.164 2.756.492 3.995.328 1.239.827 2.314 1.497 3.225a7.654 7.654 0 002.46 2.18c.97.54 2.095.811 3.378.811zm16.766-.64c.656 0 1.204-.222 1.646-.663.442-.442.663-.99.663-1.645 0-.627-.22-1.16-.663-1.602-.442-.442-.99-.662-1.646-.662-.656 0-1.205.22-1.647.662a2.181 2.181 0 00-.663 1.602c0 .655.221 1.203.663 1.645.442.441.99.662 1.647.662zm32.463-.385c1.026 0 2.003-.25 2.93-.748a12.69 12.69 0 002.63-1.901 16.722 16.722 0 002.267-2.606 45.793 45.793 0 001.86-2.841 30.397 30.397 0 001.412-2.607c.385-.811.677-1.46.877-1.944.085-.17.128-.37.128-.598 0-.398-.157-.769-.47-1.11a1.507 1.507 0 00-1.155-.513c-.713 0-1.212.342-1.497 1.025-.4.912-.913 1.98-1.54 3.204a24.909 24.909 0 01-2.16 3.482c-.813 1.097-1.69 2.023-2.63 2.777-.941.755-1.925 1.133-2.952 1.133-2.651 0-4.676-3.29-6.073-9.87.77-1.85 1.625-4.058 2.566-6.622a110.14 110.14 0 002.673-8.374 96.472 96.472 0 002.118-9.484c.57-3.304.855-6.608.855-9.912 0-1.538-.1-2.948-.3-4.23-.199-1.281-.505-2.378-.919-3.29-.413-.91-.948-1.623-1.604-2.136-.656-.512-1.454-.769-2.395-.769-1.055 0-1.996.364-2.823 1.09-.827.726-1.547 1.716-2.16 2.97-.613 1.252-1.133 2.705-1.561 4.357a46.606 46.606 0 00-1.026 5.234 71.259 71.259 0 00-.557 5.64 93.54 93.54 0 00-.17 5.532c0 4.044.199 7.704.598 10.98.4 3.275.841 6.166 1.326 8.673-.855 2.136-1.632 3.86-2.33 5.17-.7 1.31-1.341 2.32-1.926 3.033-.584.712-1.133 1.189-1.646 1.43-.514.243-.998.364-1.455.364-1.112 0-1.96-.399-2.544-1.196-.585-.798-.877-1.909-.877-3.333 0-1.737.264-3.232.791-4.486.528-1.253 1.198-2.285 2.01-3.097.813-.812 1.704-1.431 2.673-1.859.97-.427 1.882-.697 2.738-.811.428-.057.77-.242 1.026-.556a1.64 1.64 0 00.385-1.068c0-.456-.157-.833-.47-1.132a1.558 1.558 0 00-1.112-.449c-1.312 0-2.63.328-3.957.983-1.325.655-2.53 1.574-3.614 2.756-1.083 1.182-1.967 2.599-2.652 4.25-.684 1.653-1.026 3.461-1.026 5.427 0 1.424.185 2.627.556 3.61.37.982.855 1.787 1.454 2.414a5.151 5.151 0 002.096 1.345c.798.271 1.625.406 2.48.406 1.626 0 3.137-.655 4.534-1.965 1.398-1.31 2.78-3.418 4.15-6.323.997 3.048 2.18 5.234 3.55 6.558 1.368 1.324 3.007 1.987 4.918 1.987zm-7.485-18.97a135.255 135.255 0 01-.684-6.707c-.2-2.507-.3-5.013-.3-7.52 0-2.62.136-5.219.407-7.797.27-2.577.634-4.884 1.09-6.92.456-2.037.991-3.682 1.604-4.935.613-1.254 1.276-1.88 1.989-1.88.428 0 .77.242 1.026.726.257.484.464 1.09.62 1.816.157.726.257 1.502.3 2.328.043.826.064 1.595.064 2.307 0 2.45-.164 4.906-.492 7.37a79.68 79.68 0 01-1.326 7.327 88.44 88.44 0 01-1.946 7.114 139.43 139.43 0 01-2.352 6.771zm27.459 19.568c2.937-.057 5.567-1.182 7.891-3.375 2.324-2.194 4.47-5.455 6.437-9.784.057-.114.1-.22.129-.32.028-.1.042-.221.042-.364 0-.398-.15-.769-.449-1.11-.3-.342-.691-.513-1.176-.513a1.61 1.61 0 00-.855.235 1.547 1.547 0 00-.6.705 52.753 52.753 0 01-2.01 4.016 21.068 21.068 0 01-2.523 3.631c-.94 1.083-1.982 1.958-3.122 2.628-1.14.67-2.41 1.004-3.807 1.004-1.369 0-2.523-.25-3.464-.748a6.65 6.65 0 01-2.31-1.987 18.373 18.373 0 003.122-1.922c.97-.74 1.804-1.552 2.502-2.435a11.06 11.06 0 001.647-2.863c.4-1.025.599-2.122.599-3.29 0-.911-.157-1.723-.47-2.435a5.7 5.7 0 00-1.24-1.816 5.585 5.585 0 00-1.733-1.153 4.968 4.968 0 00-1.946-.406c-1.112 0-2.132.256-3.058.77-.927.512-1.725 1.224-2.396 2.135-.67.912-1.183 1.98-1.54 3.205-.356 1.224-.534 2.563-.534 4.016 0 1.452.214 2.905.642 4.357a11.88 11.88 0 001.967 3.91c.884 1.153 2.01 2.093 3.379 2.82 1.369.726 2.994 1.089 4.876 1.089zm-7.1-8.759a17.03 17.03 0 01-.364-1.623 9.42 9.42 0 01-.15-1.624c0-.826.08-1.659.236-2.499a8.61 8.61 0 01.748-2.286c.343-.683.785-1.239 1.326-1.666.542-.427 1.198-.64 1.968-.64.57 0 1.07.22 1.497.662.427.441.641 1.089.641 1.943 0 .77-.142 1.531-.427 2.286a8.716 8.716 0 01-1.198 2.158 10.431 10.431 0 01-4.277 3.29zm26.39 8.332c.655-.057 1.44-.456 2.352-1.197.912-.74 1.818-1.751 2.716-3.033.898-1.282 1.746-2.784 2.545-4.507a26.378 26.378 0 001.839-5.576c.4.712.884 1.417 1.454 2.115.57.698 1.205 1.324 1.904 1.88a9.732 9.732 0 002.33 1.367 7.163 7.163 0 002.78.534c.856 0 1.633-.15 2.332-.449a6.658 6.658 0 001.817-1.132c.514-.456.934-.94 1.262-1.452a9.72 9.72 0 00.749-1.368c.085-.199.128-.398.128-.598a1.59 1.59 0 00-.47-1.132 1.537 1.537 0 00-1.155-.491c-.342 0-.649.092-.92.278-.27.185-.463.434-.577.747 0 .029-.064.171-.193.427-.128.257-.32.527-.577.812a3.933 3.933 0 01-.984.77c-.4.227-.87.341-1.411.341-.998 0-1.882-.256-2.652-.769a8.562 8.562 0 01-2.032-1.901 13.004 13.004 0 01-1.497-2.457 28.716 28.716 0 01-1.026-2.456 17.932 17.932 0 01-.578-1.859c-.114-.484-.17-.712-.17-.684a1.543 1.543 0 00-.578-.94 1.619 1.619 0 00-1.005-.341c-.485 0-.877.164-1.176.491-.3.328-.45.734-.45 1.218 0 .285.008.562.022.833.014.27.021.548.021.833 0 1.396-.135 2.77-.406 4.123a26.187 26.187 0 01-1.07 3.845 29.285 29.285 0 01-1.454 3.354 26.324 26.324 0 01-1.54 2.649c-.498.74-.969 1.324-1.41 1.751-.443.427-.778.641-1.006.641-.342 0-.777-.292-1.304-.876-.528-.584-1.034-1.388-1.519-2.414-.485-1.025-.898-2.25-1.24-3.674-.342-1.424-.513-2.976-.513-4.657 0-1.424.114-2.492.342-3.204.228-.712.356-1.097.385-1.154.114-.199.17-.441.17-.726 0-.399-.142-.762-.427-1.09-.285-.327-.67-.49-1.155-.49-.313 0-.591.07-.834.213a1.555 1.555 0 00-.577.598c-.047.078-.13.278-.248.602l-.131.364c-.072.203-.152.436-.241.7-.328.969-.492 2.393-.492 4.273 0 2.136.27 4.115.812 5.938.542 1.823 1.22 3.397 2.032 4.721.813 1.325 1.668 2.357 2.566 3.098.898.74 1.718 1.11 2.46 1.11z"
                fillRule="nonzero"
              ></path>
            </svg>
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

export { runtime, size, contentType };

export default Image;
