import * as crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import getWebpageSummary from "../../../repositories/webpageSummary/scraping/getWebpageSummary";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.statusCode = 404;
    res.end();

    return;
  }

  const url = req.query.url;

  if (!url) {
    res.statusCode = 400;
    res.end("the url must be given.");

    return;
  }

  try {
    const webpageSummary = await getWebpageSummary({
      url: new URL(url.toString()),
    });

    res.statusCode = 200;
    res.setHeader("content-type", "application/json; charset=UTF-8");
    res.setHeader("cache-control", `public, max-age=${60 * 60 * 24 * 90}`);
    res.setHeader(
      "etag",
      crypto
        .createHash("sha1")
        .update(`${webpageSummary.title}${webpageSummary.description}`)
        .digest("hex")
    );
    res.end(JSON.stringify(webpageSummary));
  } catch (err) {
    res.statusCode = 404;
    res.end(err.message);
  }
}
