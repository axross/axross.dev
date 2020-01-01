import styled from "@emotion/styled";
import * as React from "react";
import Heading from "../../components/PrettyMarkdown/Heading";
import MarkdownText, {
  TextType as MarkdownTextType
} from "../../components/PrettyMarkdown/MarkdownText";
import Paragraph from "../../components/PrettyMarkdown/Paragraph";
import Text, { TextType } from "../../components/Text";
import LocaleContext from "../../contexts/LocaleContext";
import { NOT_FOUND_DESCRIPTION, NOT_FOUND_TITLE } from "../../dictionary";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  className?: string;
}

export default function ArticleNotFound(props: Props) {
  const { currentLocale } = React.useContext(LocaleContext);

  return (
    <section {...props}>
      <Heading level={1} {...props}>
        <MarkdownText
          type={MarkdownTextType.heading1}
          color={ThemedColor.emphasizedForeground}
          {...props}
        >
          {NOT_FOUND_TITLE[currentLocale]}
        </MarkdownText>
      </Heading>

      <StatusCode color={ThemedColor.secondaryForeground} type={TextType.label}>
        404 Not Found
      </StatusCode>

      <Description>
        <Paragraph>
          <MarkdownText
            type={MarkdownTextType.paragraph}
            color={ThemedColor.foreground}
            {...props}
          >
            {NOT_FOUND_DESCRIPTION[currentLocale]}
          </MarkdownText>
        </Paragraph>
      </Description>
    </section>
  );
}

const Description = styled.div`
  margin-block-start: 32px;
`;

const StatusCode = styled(Text)`
  margin-block-start: 32px;
`;
