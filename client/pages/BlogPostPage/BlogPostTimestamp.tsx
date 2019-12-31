import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Text, { TextType } from "../../components/Text";
import { BLOG_POST_TIMETAMP } from "../../dictionary";
import LocaleContext from "../../contexts/LocaleContext";
import ThemedColor from "../../types/ThemedColor";

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
    <Text
      color={ThemedColor.secondaryForeground}
      type={TextType.label}
      {...props}
    >
      {new IntlMessageFormat(BLOG_POST_TIMETAMP[currentLocale]).format({
        createdAt: new Intl.DateTimeFormat(currentLocale).format(createdAt)
      })}
    </Text>
  );
}
