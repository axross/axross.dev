import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import UIText, { UITextType } from "../../components/UIText";
import { BLOG_POST_TIMETAMP } from "../../dictionary";
import LocaleContext from "../../contexts/LocaleContext";

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
  const { currentLocale } = React.useContext(LocaleContext);

  return (
    <UIText type={UITextType.caption} {...props}>
      {new IntlMessageFormat(BLOG_POST_TIMETAMP[currentLocale]).format({
        createdAt: new Intl.DateTimeFormat(currentLocale).format(createdAt)
      })}
    </UIText>
  );
}
