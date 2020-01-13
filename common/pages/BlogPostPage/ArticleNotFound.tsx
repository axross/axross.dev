import styled from "@emotion/styled";
import * as React from "react";
import RawText, { TextLineSize, TextSize, ThemedColor } from "../../components/RawText";
import LocaleContext from "../../contexts/LocaleContext";
import { NOT_FOUND_DESCRIPTION, NOT_FOUND_TITLE } from "../../dictionary";

interface Props extends React.Attributes {
  className?: string;
}

export default function ArticleNotFound(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);

  return (
    <section {...props}>
      <RawText color={ThemedColor.emphasizedForeground} size={TextSize.giantic} bold>
        {NOT_FOUND_TITLE[currentLocale]}
      </RawText>

      <StatusCode color={ThemedColor.secondaryForeground}>
        404 Not Found
      </StatusCode>

      <Description lineSize={TextLineSize.large}>
        {NOT_FOUND_DESCRIPTION[currentLocale]}
      </Description>
    </section>
  );
}

const Description = styled(RawText)`
  margin-block-start: 32px;
`;

const StatusCode = styled(RawText)`
  margin-block-start: 32px;
`;
