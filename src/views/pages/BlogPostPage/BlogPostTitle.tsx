import * as React from "react";
import Heading from "../../components/PrettyMarkdown/Heading";
import MarkdownText, {
  TextType
} from "../../components/PrettyMarkdown/MarkdownText";
import ThemedColor from "../../types/ThemedColor";

interface Props extends React.Attributes {
  className?: string;
  children?: string;
}

export default function BlogPostTitle({ children, ...props }: Props) {
  return (
    <Heading level={1} {...props}>
      <MarkdownText
        type={TextType.heading1}
        color={ThemedColor.emphasizedForeground}
        {...props}
      >
        {children}
      </MarkdownText>
    </Heading>
  );
}
