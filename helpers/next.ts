import { IncomingMessage } from "http";

export function getOriginFromRequest(req: IncomingMessage): string {
  return req.headers.host === "localhost"
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;
}
