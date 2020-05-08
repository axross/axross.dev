export default interface WebpageSummary {
  readonly url: URL;
  readonly title: string;
  readonly description: string | null;
  readonly imageURL: URL | null;
}
