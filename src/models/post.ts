import { type Locale } from "~/models/locale";

interface Author {
  name: string;
  email: string;
  avatarImageUrl: URL;
}

interface Post {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  keywords: string[];
  coverImageUrl: URL;
  createdAt: Date;
  createdBy: Author;
  lastEditedAt: Date;
}

export type { Author, Post };
