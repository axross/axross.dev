import * as React from "react";
import UIText, { UITextType } from "../UIText";
import useLocale from "../../hooks/useLocale";
import useTranslation from "../../hooks/useTranslation";

interface Props extends React.Attributes {
  createdAt: Date;
  lastModifiedAt: Date;
  className?: string;
}

export default function BlogPostTimestamp({
  createdAt,
  lastModifiedAt,
  ...props
}: Props) {
  const { currentLocale } = useLocale();
  const timestamp = useTranslation("BLOG_POST_TIMETAMP", {
    createdAt: new Intl.DateTimeFormat(currentLocale).format(createdAt)
  });

  return (
    <UIText type={UITextType.caption} {...props}>
      {timestamp}
    </UIText>
  );
}
