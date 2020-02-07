import { MY_NAME } from "./constant/data";
import LocaleString from "./entities/LocaleString";

export default {
  NOT_FOUND_TITLE: {
    "en-US": "Oops!",
    "ja-JP": "Oops!"
  },
  NOT_FOUND_DESCRIPTION: {
    "en-US":
      "The post is not found. Probably it can be available in other language.",
    "ja-JP":
      "お探しの記事が見つかりませんでした。もしかしたら他の言語でご覧になることができるかもしれません。"
  },
  WEBSITE_TITLE: {
    "en-US": MY_NAME,
    "ja-JP": MY_NAME
  },
  WEBSITE_TITLE_BLOG_POST: {
    "en-US": `{title} | What ${MY_NAME} wrote`,
    "ja-JP": `{title} | What ${MY_NAME} wrote`
  },
  WEBSITE_TITLE_BLOG_POST_LOADING: {
    "en-US": `Loading... | What ${MY_NAME} wrote`,
    "ja-JP": `読み込み中... | What ${MY_NAME} wrote`
  },
  WEBSITE_TITLE_BLOG_POST_NOT_FOUND: {
    "en-US": "404 Not Found",
    "ja-JP": "404 Not Found"
  },
  WEBSITE_DESCRIPTION: {
    "en-US": `${MY_NAME}'s personal website. My experience, projects and bloggging.`,
    "ja-JP": `${MY_NAME}の個人ウェブサイト。経歴や活動状況、ブログなど。`
  },
  BLOG_POST_TIMETAMP: {
    "en-US": "Written on {createdAt}",
    "ja-JP": "{createdAt}に投稿"
  },
  WHOAMI_HEADING: {
    "en-US": "whoami",
    "ja-JP": "whoami"
  },
  RECENT_N_BLOG_POSTS_HEADING: {
    "en-US": "Blog Posts",
    "ja-JP": "ブログ"
  },
  WEBSITE_PURPOSE_HEADING: {
    "en-US": "What's This Website?",
    "ja-JP": "このWebサイトは？"
  },
  LANGUAGE_EN_US: {
    "en-US": "English",
    "ja-JP": "English"
  },
  LANGUAGE_JA_JP: {
    "en-US": "Japanese (日本語)",
    "ja-JP": "日本語"
  },
} as Record<string, Record<LocaleString, string>>;
