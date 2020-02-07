import styled from "@emotion/styled";
import * as React from "react";
import useTranslation from "../../hooks/useTranslation";
import RawText, { TextLineSize, TextSize, ThemedColor } from "../RawText";

interface Props extends React.Attributes {
  className?: string;
}

export default function ArticleNotFound(props: Props) {
  const title = useTranslation("NOT_FOUND_TITLE");
  const description = useTranslation("NOT_FOUND_DESCRIPTION");

  return (
    <section {...props}>
      <Title color={ThemedColor.emphasizedForeground} size={TextSize.giantic} bold>
        {title}
      </Title>

      <StatusCode color={ThemedColor.secondaryForeground}>
        404 Not Found
      </StatusCode>

      <Description lineSize={TextLineSize.large}>
        {description}
      </Description>
    </section>
  );
}

const Title = styled(RawText)`
  display: block;
`

const Description = styled(RawText)`
  display: block;
  margin-block-start: 32px;
`;

const StatusCode = styled(RawText)`
  display: block;
  margin-block-start: 32px;
`;
