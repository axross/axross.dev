export type BlogPostId = string;

type MarkdownString = string;

export default interface BlogPost {
  id: BlogPostId;
  createdAt: Date;
  lastModifiedAt: Date;
  title: string;
  summary: string;
  body: MarkdownString;
}
