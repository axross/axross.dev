import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Text, { TextType } from "../../components/Text";
import LocaleContext from "../../contexts/LocaleContext";
import { RECENT_N_BLOG_POSTS_HEADING } from "../../dictionary";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  className?: string;
}

export default function FirstNBlogPostsHeading(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);

  return (
    <h2 {...props}>
      <Text
        color={ThemedColor.emphasizedForeground}
        type={TextType.subtitle}
        maxLines={0}
      >
        {new IntlMessageFormat(
          RECENT_N_BLOG_POSTS_HEADING[currentLocale]
        ).format()}
      </Text>
    </h2>
  );
}
