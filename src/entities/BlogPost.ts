export type BlogPostId = string;

type MarkdownString = string;

interface BlogPost {
  id: BlogPostId;
  createdAt: Date;
  lastModifiedAt: Date;
  title: string;
  summary: string;
  body: MarkdownString;
}

export default BlogPost;
