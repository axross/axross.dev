export default interface BlogPost {
  readonly id: BlogPostId;
  readonly createdAt: Date;
  readonly lastModifiedAt: Date;
  readonly title: string;
  readonly summary: string;
  readonly body: MarkdownString;
}

export type BlogPostId = string;

export type MarkdownString = string;
