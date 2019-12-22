export const NO_LOCALE_MATTER_PATHS = new Set(["/robots.txt", "/sitemap.xml"]);

export const NO_LOCALE_FALLBACK_PATHS = new Set(["/posts/feed.xml"]);

export const PRECONNECT_URLS = new Set([
  "https://images.ctfassets.net",
  "https://www.google.ca",
  "https://www.google.com",
  "https://www.google-analytics.com",
  "https://stats.g.doubleclick.net"
]);

export const CONTENT_SECURITY_POLICY = new Map<string, string[]>();

CONTENT_SECURITY_POLICY.set("default-src", ["'none'"]);
CONTENT_SECURITY_POLICY.set("img-src", [
  "{SELF_URL}",
  "https://images.ctfassets.net",

  // there 3 are for google analytics
  "https://www.google-analytics.com",
  "https://stats.g.doubleclick.net",
  "https://www.google.com"
]);
CONTENT_SECURITY_POLICY.set("media-src", ["https://*.ctfassets.net"]);
CONTENT_SECURITY_POLICY.set("script-src", [
  "{SELF_URL}",

  // these 3 are for google analytics
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "'sha256-6DELbQJmrBPpBmoPBeNHhSHAD6sidc72qGApkgX4m0E='"
]);
CONTENT_SECURITY_POLICY.set("style-src", [
  "https://fonts.googleapis.com",

  // for css-in-js
  "'unsafe-inline'"
]);
CONTENT_SECURITY_POLICY.set("font-src", ["https://fonts.gstatic.com"]);
CONTENT_SECURITY_POLICY.set("connect-src", [
  // for script prefetching
  "{SELF_URL}",

  // for data in cms
  "https://cdn.contentful.com"
]);

export const CONTENT_SECURITY_POLICY_REPORT_URL =
  "https://kohei.report-uri.com/r/d/csp/reportOnly";

export const CONTENT_SECURITY_POLICY_REPORT_TO =
  '{"group":"default","max_age":31536000,"endpoints":[{"url":"https://kohei.report-uri.com/a/d/g"}],"include_subdomains":true}';
