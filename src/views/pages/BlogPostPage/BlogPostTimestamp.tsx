import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import useFormatRelative from "../../hooks/useFormatRelative";
import useTranslation from "../../hooks/useTranslation";
import Text, { TextColor, TextSize } from "../../components/Text";

interface Props extends React.Attributes {
  createdAt: Date;
  lastModifiedAt: Date;
  className?: string;
}

export default function BlogPostTimestamp({ createdAt, lastModifiedAt, ...props }: Props) {
  const translation = useTranslation();
  const formatRelative = useFormatRelative();

  return (
    <span {...props}>
      <Text color={TextColor.secondary} size={TextSize.caption}>
        {new IntlMessageFormat(translation["blogPost.timestamp"]).format({
          createdAt: formatRelative(createdAt)
        })}
      </Text>
    </span>
  );
}
