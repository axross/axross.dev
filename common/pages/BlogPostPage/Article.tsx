import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import RawText, { TextSize, ThemedColor } from "../../components/RawText";
import { MOBILE } from "../../constant/mediaQuery";
import BlogPostTimestamp from "./BlogPostTimestamp";

interface Props extends React.Attributes {
  blogPost: BlogPost;
  className?: string;
}

export default function Article({ blogPost, ...props }: Props) {
  return (
    <article {...props}>
      <RawText color={ThemedColor.emphasizedForeground} size={TextSize.giantic}>
        {blogPost.title}
      </RawText>

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
