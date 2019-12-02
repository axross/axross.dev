import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Text, { TextColor, TextSize } from "../../components/Text";
import LocaleContext from "../../contexts/LocaleContext";
import TranslationContext from "../../contexts/TranslationContext";

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
  const translation = React.useContext(TranslationContext);

  return (
    <span {...props}>
      <Text color={TextColor.secondary} size={TextSize.caption}>
        {new IntlMessageFormat(translation["blogPost.timestamp"]).format({
          createdAt: new Intl.DateTimeFormat(currentLocale).format(createdAt)
        })}
      </Text>
    </span>
  );
}
