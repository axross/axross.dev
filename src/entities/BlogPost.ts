export default class BlogPost {
  readonly id: BlogPostId;
  readonly createdAt: Date;
  readonly lastModifiedAt: Date;
  readonly title: string;
  readonly summary: string;
  readonly body: MarkdownString;

  constructor({
    id,
    createdAt,
    lastModifiedAt,
    title,
    summary,
    body
  }: {
    id: BlogPostId;
    createdAt: Date;
    lastModifiedAt: Date;
    title: string;
    summary: string;
    body: MarkdownString;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.title = title;
    this.summary = summary;
    this.body = body;
  }

  toJSON(): BlogPostJSON {
    return {
      id: this.id,
      createdAt: this.createdAt.toJSON(),
      lastModifiedAt: this.lastModifiedAt.toJSON(),
      title: this.title,
      summary: this.summary,
      body: this.body
    };
  }

  static fromJSON(json: BlogPostJSON): BlogPost {
    return new BlogPost({
      id: json.id,
      createdAt: new Date(json.createdAt),
      lastModifiedAt: new Date(json.lastModifiedAt),
      title: json.title,
      summary: json.summary,
      body: json.body
    });
  }
}

export type BlogPostId = string;

export type MarkdownString = string;

export interface BlogPostJSON {
  id: string;
  createdAt: string;
  lastModifiedAt: string;
  title: string;
  summary: string;
  body: string;
}
