import "server-only";

import { Locale } from "~/models/locale";

export const availableLocales: Locale[] = ["en-US", "ja-JP"];
export const fallbackLocale: Locale = "en-US";
