import * as React from "react";
import UIText, { UITextType } from "../UIText";
import useTranslation from "../../hooks/useTranslation";

interface Props extends React.Attributes {
  className?: string;
}

export default function FirstNBlogPostsHeading(props: Props) {
  const heading = useTranslation("RECENT_N_BLOG_POSTS_HEADING");

  return (
    <h2 {...props}>
      <UIText type={UITextType.subtitle}>{heading}</UIText>
    </h2>
  );
}
