import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import UIText, { UITextType } from "../UIText";
import { BLOG_POST_TIMETAMP } from "../../dictionary";
import useLocale from "../../hooks/useLocale";

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

  return (
    <UIText type={UITextType.caption} {...props}>
      {new IntlMessageFormat(BLOG_POST_TIMETAMP[currentLocale]).format({
        createdAt: new Intl.DateTimeFormat(currentLocale).format(createdAt)
      })}
    </UIText>
  );
}
