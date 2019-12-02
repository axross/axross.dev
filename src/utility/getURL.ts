import { NextPageContext } from "next";

export default function getURL(context: NextPageContext): URL {
  if (context.req) {
    const host = context.req.headers.host;

    if (!host) throw new Error("host must be included");

    const origin = host.startsWith("localhost")
      ? `http://${host}`
      : `https://${host}`;

    return new URL(context.asPath!, origin);
  }

  if (typeof window !== "undefined") {
    return new URL(context.asPath!, window.location.origin);
  }

  throw new Error("unreachable here.");
}
