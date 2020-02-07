import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { WEBSITE_TITLE_BLOG_POST, WEBSITE_TITLE_BLOG_POST_NOT_FOUND } from "../../dictionary";
import BlogPost from "../../entities/BlogPost";
import useLocale from "../../hooks/useLocale";
import useURL from "../../hooks/useURL";

export default function useLoggingPageView(blogPost: BlogPost | null, blogPostLoading: boolean): void {
  const url = useURL();
  const { currentLocale } = useLocale();

  React.useEffect(() => {
    if (typeof (window as any).ga === "undefined") return;
    if (blogPostLoading) return;

    globalThis.ga("set", "location", url.href);

    if (blogPost) {
      (window as any).ga(
        "set",
        "title",
        new IntlMessageFormat(WEBSITE_TITLE_BLOG_POST[currentLocale]).format({
          title: blogPost.title,
        })
      );
    } else {
      (window as any).ga(
        "set",
        "title",
        new IntlMessageFormat(
          WEBSITE_TITLE_BLOG_POST_NOT_FOUND[currentLocale]
        ).format()
      );
    }

    globalThis.ga("send", "pageview");
  }, [currentLocale, blogPost, blogPostLoading]);
}
