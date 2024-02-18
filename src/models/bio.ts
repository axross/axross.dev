import { type Locale } from "~/models/locale";

interface Bio {
  id: string;
  locale: Locale;
  title: string;
  summary: string;
  coverImageUrl: URL;
}

export type { Bio };
