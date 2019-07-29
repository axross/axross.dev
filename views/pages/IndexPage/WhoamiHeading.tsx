import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import Text, { TextColor, TextSize } from "../../components/Text";
import useTranslation from "../../hooks/useTranslation";

interface Props extends React.Attributes {
  className?: string;
}

function WhoamiHeading(props: Props) {
  const translation = useTranslation();

  return (
    <h2 {...props}>
      <Text color={TextColor.black} size={TextSize.title} bold multiline>
        {new IntlMessageFormat(translation["whoami"]).format()}
      </Text>
    </h2>
  );
}

export default WhoamiHeading;
