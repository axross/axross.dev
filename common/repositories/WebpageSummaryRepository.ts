import WebpageSummary from "../entities/WebpageSummary";

export default interface WebpageSummaryRepository {
  getByURL(url: URL): Promise<WebpageSummary>;
}
