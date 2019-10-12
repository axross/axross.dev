import { IncomingMessage } from 'http';

export default function getOrigin(req?: IncomingMessage): string {
  if (req) {
    const host = req.headers.host;

    if (!host) throw new Error("host must be included");

    return host.startsWith("localhost")
      ? `http://${host}`
      : `https://${host}`;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  throw new Error("unreachable here.");
}