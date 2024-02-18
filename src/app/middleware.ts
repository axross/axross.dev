import { type NextRequest, NextResponse } from "next/server";

function configureCsp(headers: Headers): Headers {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const policies = [
    "default-src 'self';",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic';`,
    `style-src 'self' 'nonce-${nonce}';`,
    "img-src 'self' blob: data:;",
    "font-src 'self';",
    "object-src 'none';",
    "base-uri 'self';",
    "form-action 'self';",
    "frame-ancestors 'none';",
    "block-all-mixed-content;",
    "upgrade-insecure-requests;",
  ];

  const nextHeaders = new Headers(headers);

  // read and use this value for selectively allow some 3rd-party scripts
  nextHeaders.set("x-nonce", nonce);
  nextHeaders.set("content-security-policy", policies.join(" "));

  return nextHeaders;
}

function middleware(request: NextRequest): Response {
  const headersWithCsp = configureCsp(request.headers);
  const response = NextResponse.next({
    request: {
      headers: headersWithCsp,
    },
  });

  return response;
}

export { middleware };
