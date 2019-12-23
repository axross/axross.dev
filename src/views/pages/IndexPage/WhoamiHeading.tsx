import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { ThemedColor } from "../../../entities/ColorTheme";
import Text, { TextSize } from "../../components/Text";
import TranslationContext from "../../contexts/TranslationContext";

interface Props extends React.Attributes {
  className?: string;
}

export default function WhoamiHeading(props: Props) {
  const translation = React.useContext(TranslationContext);

  return (
    <h2 {...props}>
      <Text
        color={ThemedColor.emphasizedForeground}
        size={TextSize.title}
        bold
        maxLines={0}
      >
        {new IntlMessageFormat(translation["whoami"]).format()}
      </Text>
    </h2>
  );
}
