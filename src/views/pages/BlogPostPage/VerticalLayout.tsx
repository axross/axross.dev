import styled from "@emotion/styled";
import * as React from 'react';
import BlogPost from "../../../entities/BlogPost";
import Person from "../../../entities/Person";
import HeadBar from '../../components/HeadBar';
import PrettyMarkdown from "../../components/PrettyMarkdown";
import BlogPostTimestamp from "./BlogPostTimestamp";
import BlogPostTitle from './BlogPostTitle';

interface Props extends React.Attributes {
  person: Person;
  blogPost: BlogPost;
  className?: string;
}

export default function VerticalLayout({ person, blogPost, ...props}: Props) {
  return <Root {...props}>
    <HeadBar />

    <Article>
      <BlogPostTimestamp createdAt={blogPost.createdAt} lastModifiedAt={blogPost.createdAt} />

      <_BlogPostTitle>
        {blogPost.title}
      </_BlogPostTitle>

      <PrettyMarkdown>
        {blogPost.body}
      </PrettyMarkdown>
    </Article>
  </Root>
}

const Root = styled.div`
  max-width: 400px;
  margin-inline: auto;
`;

const Article = styled.article`
  margin-block-start: 16px;
  padding-block-end: 48px;
  padding-inline: 20px;
`;

const _BlogPostTitle = styled(BlogPostTitle)`
  margin-block-start: 16px;
`;
