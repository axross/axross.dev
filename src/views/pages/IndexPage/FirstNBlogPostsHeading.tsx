import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Text, { TextType } from "../../components/Text";
import TranslationContext from "../../contexts/TranslationContext";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  className?: string;
}

export default function FirstNBlogPostsHeading(props: Props) {
  const translation = React.useContext(TranslationContext);

  return (
    <h2 {...props}>
      <Text
        color={ThemedColor.emphasizedForeground}
        type={TextType.subtitle}
        maxLines={0}
      >
        {new IntlMessageFormat(translation["recent_n_blog_posts"]).format()}
      </Text>
    </h2>
  );
}
