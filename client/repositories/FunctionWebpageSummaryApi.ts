import WebpageSummaryApi from "../../common/repositories/WebpageSummaryApi";
import WebpageSummary from "../../common/entities/WebpageSummary";

export default class FunctionWebpageSummaryApi implements WebpageSummaryApi {
  async getByURL(url: URL): Promise<WebpageSummary> {
    const response = await fetch(`/functions/getWebpageSummary?url=${encodeURIComponent(`${url}`)}`);

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
