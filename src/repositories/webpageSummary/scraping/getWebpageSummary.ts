import GetWebpageSummary from "../GetWebpageSummary";

const getWebpageSummary: GetWebpageSummary = async ({ url }) => {
  const response = await fetch(url.href, { headers: { "user-agent": "facebookexternalhit/1.1" } });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`${url.href} responded ${response.status}.`);
  }

  if (!response.headers.get("content-type")?.includes("text/html")) {
    throw new Error(`${url.href} responded ${response.headers.get("content-type")}.`);
  }

  const $ = cheerio.load(await response.text());

  let ogpURLString = $("meta[property='og:url']").attr("content");
  const ogpTitle = $("meta[property='og:title']").attr("content");
  const ogpDescription = $("meta[property='og:description']").attr("content");
  const ogpImageURL = $("meta[property='og:image']").attr("content");
  const documentTitle = $("title").text();
  const documentDescription = $("meta[name='description']").attr("content");

  let ogpURL: URL = url;

  if (ogpURLString) {
    try {
      ogpURL = new URL(ogpURLString);
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
    throw new Error(`${url.href} responded a HTML that doesn't have the document title.`);
  }

  return {
    url: ogpURL,
    title,
    description,
    imageURL,
  };
}

export default getWebpageSummary;
