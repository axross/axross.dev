import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import useLocale from "../../hooks/useLocale";
import useTranslation from "../../hooks/useTranslation";
import useURL from "../../hooks/useURL";

export default function useLoggingPageView(
  blogPost: BlogPost | null,
  blogPostLoading: boolean
): void {
  const url = useURL();
  const { currentLocale } = useLocale();
  const title = useTranslation("WEBSITE_TITLE_BLOG_POST", {
    title: blogPost?.title,
  });
  const notFoundTitle = useTranslation("WEBSITE_TITLE_BLOG_POST_NOT_FOUND");

  React.useEffect(() => {
    if (typeof globalThis.ga === "undefined") return;
    if (blogPostLoading) return;

    globalThis.ga("set", "location", url.href);

    if (blogPost) {
      globalThis.ga("set", "title", title);
    } else {
      globalThis.ga("set", "title", notFoundTitle);
    }

    globalThis.ga("send", "pageview");
  }, [currentLocale, blogPost, blogPostLoading]);
}
