import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import UIText, { UITextType } from "../../UIText";
import { WEBSITE_PURPOSE_HEADING } from "../../../dictionary";
import useLocale from "../../../hooks/useLocale";

interface Props extends React.Attributes {
  className?: string;
}

export default function WebsitePurposeHeading(props: Props) {
  const { currentLocale } = useLocale();

  return (
    <h2 {...props}>
      <UIText type={UITextType.subtitle}>
        {new IntlMessageFormat(
          WEBSITE_PURPOSE_HEADING[currentLocale]
        ).format()}
      </UIText>
    </h2>
  );
}
