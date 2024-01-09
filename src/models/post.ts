interface Author {
  name: string;
  avatarImageUrl: URL;
}

interface Post {
  id: string;
  slug: string;
  locale: string;
  title: string;
  tags: string[];
  coverImageUrl: URL;
  createdAt: Date;
  createdBy: Author;
  lastEditedAt: Date;
}

export type { Author, Post };
