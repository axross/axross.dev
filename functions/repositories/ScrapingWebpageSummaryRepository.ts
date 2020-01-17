import * as cheerio from "cheerio";
import fetch from "node-fetch";
import WebpageSummary from "../../common/entities/WebpageSummary";
import WebpageSummaryRepository from "../../common/repositories/WebpageSummaryRepository";

export default class ScrapingWebpageSummaryRepository implements WebpageSummaryRepository {
  async getByURL(requestedURL: URL): Promise<WebpageSummary> {
    const response = await fetch(requestedURL, { headers: { "user-agent": "facebookexternalhit/1.1" } });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`${requestedURL} responded ${response.status}.`);
    }

    if (!response.headers.get("content-type")?.includes("text/html")) {
      throw new Error(`${requestedURL} responded ${response.headers.get("content-type")}.`);
    }

    const $ = cheerio.load(await response.text());

    const ogpUrl = $("meta[property='og:url']").attr("content");
    const ogpTitle = $("meta[property='og:title']").attr("content");
    const ogpDescription = $("meta[property='og:description']").attr("content");
    const ogpImageURL = $("meta[property='og:image']").attr("content");
    const documentTitle = $("title").text();
    const documentDescription = $("meta[name='description']").attr("content");

    let url: URL = requestedURL;

    if (ogpUrl) {
      try {
        url = new URL(ogpUrl);
      } catch (_) {}
    }

    const title = ogpTitle ?? documentTitle ?? null;
    const description = ogpDescription ?? documentDescription ?? null;

    let imageURL: URL | null = null;

    if (ogpImageURL) {
      try {
        imageURL = new URL(ogpImageURL);
      } catch (_) {}
    }

    if (title === null) {
      throw new Error(`${requestedURL} responded a HTML that doesn't have the document title.`);
    }

    return {
      url,
      title,
      description,
      imageURL,
    };
  }
}
