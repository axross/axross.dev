import * as http from "http";

function getOriginIsomorphicly(request?: http.IncomingMessage) {
  if (request) {
    const host = request.headers.host;

    if (host) {
      const protocol = host.includes("localhost") ? "http" : "https";

      return `${protocol}://${host}`;
    }
  }

  if (typeof location !== "undefined") {
    return location.origin;
  }

  throw new Error("no origin");
}

export default getOriginIsomorphicly;
