import WebpageSummary from "../../entities/WebpageSummary";

type GetWebpageSummary = (params: { url: URL }) => Promise<WebpageSummary>;

export default GetWebpageSummary;
