export interface Post {
  id: string;
  slug: string;
  locale: string;
  title: string;
  tags: string[];
  createdAt: Date;
  lastEditedAt: Date;
}
