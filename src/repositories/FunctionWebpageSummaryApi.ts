import WebpageSummaryApi from "./WebpageSummaryApi";
import WebpageSummary from "../entities/WebpageSummary";

export default class FunctionWebpageSummaryApi implements WebpageSummaryApi {
  async getByURL(url: URL): Promise<WebpageSummary> {
    const response = await fetch(`/api/webpage_summaries/${encodeURIComponent(`${url}`)}`);

    if (!response.ok) new Error();

    const json = await response.json();

    return {
      url: new URL(json.url),
      title: json.title,
      description: json.description,
      imageURL: new URL(json.imageURL),
    };
  }
}
