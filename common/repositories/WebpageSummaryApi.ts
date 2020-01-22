import WebpageSummary from "../entities/WebpageSummary";

export default interface WebpageSummaryApi {
  getByURL(url: URL): Promise<WebpageSummary>;
}
