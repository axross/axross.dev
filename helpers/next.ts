import { IncomingMessage } from "http";

export function getOriginFromRequest(req: IncomingMessage): string {
  return /^localhost:[1-9][0-9]+$/.test(req.headers.host!)
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;
}
