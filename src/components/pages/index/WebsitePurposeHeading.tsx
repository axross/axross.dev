import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import UIText, { UITextType } from "../../UIText";
import LocaleContext from "../../../contexts/LocaleContext";
import { WEBSITE_PURPOSE_HEADING } from "../../../dictionary";

interface Props extends React.Attributes {
  className?: string;
}

export default function WebsitePurposeHeading(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);

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
