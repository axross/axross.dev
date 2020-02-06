import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { RECENT_N_BLOG_POSTS_HEADING } from "../../dictionary";
import useLocale from "../../hooks/useLocale";
import UIText, { UITextType } from "../UIText";

interface Props extends React.Attributes {
  className?: string;
}

export default function FirstNBlogPostsHeading(props: Props) {
  const { currentLocale } = useLocale();

  return (
    <h2 {...props}>
      <UIText type={UITextType.subtitle}>
        {new IntlMessageFormat(
          RECENT_N_BLOG_POSTS_HEADING[currentLocale]
        ).format()}
      </UIText>
    </h2>
  );
}
