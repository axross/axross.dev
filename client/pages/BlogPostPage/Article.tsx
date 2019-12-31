import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../../common/entities/BlogPost";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import Heading from "../../components/PrettyMarkdown/Heading";
import MarkdownText, {
  TextType
} from "../../components/PrettyMarkdown/MarkdownText";
import { MOBILE } from "../../constant/mediaQuery";
import ThemedColor from "../../types/ThemedColor";
import BlogPostTimestamp from "./BlogPostTimestamp";

interface Props extends React.Attributes {
  blogPost: BlogPost;
  className?: string;
}

export default function Article({ blogPost, ...props }: Props) {
  return (
    <article {...props}>
      <Heading level={1} {...props}>
        <MarkdownText
          type={TextType.heading1}
          color={ThemedColor.emphasizedForeground}
          {...props}
        >
          {blogPost.title}
        </MarkdownText>
      </Heading>

      <Timestamp
        createdAt={blogPost.createdAt}
        lastModifiedAt={blogPost.createdAt}
      />

      <PrettyMarkdown>{blogPost.body}</PrettyMarkdown>
    </article>
  );
}

const Timestamp = styled(BlogPostTimestamp)`
  display: block;
  margin-block-start: 32px;
  margin-block-end: 32px;

  ${MOBILE} {
    margin-block-start: 24px;
    margin-block-end: 24px;
  }
`;
