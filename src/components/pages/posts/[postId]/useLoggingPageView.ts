import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import LocaleContext from "../../../../contexts/LocaleContext";
import { WEBSITE_TITLE_BLOG_POST, WEBSITE_TITLE_BLOG_POST_NOT_FOUND } from "../../../../dictionary";
import BlogPost from "../../../../entities/BlogPost";

export default function useLoggingPageView(blogPost: BlogPost | null, blogPostLoading: boolean): void {
  const { currentLocale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    if (typeof (window as any).ga === "undefined") return;
    if (blogPostLoading) return;

    (window as any).ga("set", "location", window.location.href);

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

    (window as any).ga("send", "pageview");
  }, [currentLocale, blogPost, blogPostLoading]);
}
