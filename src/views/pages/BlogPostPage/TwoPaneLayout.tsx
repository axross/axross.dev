import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import Person from "../../../entities/Person";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import BlogPostTimestamp from "./BlogPostTimestamp";
import BlogPostTitle from "./BlogPostTitle";
import Profile from "./Profile";

interface Props extends React.Attributes {
  person: Person;
  blogPost: BlogPost;
  className?: string;
}

export default function TwoPaneLayout({ person, blogPost, ...props }: Props) {
  return (
    <Root {...props}>
      <LeftPane>
        <Profile person={person} />
      </LeftPane>

      <RightPane>
        <LocaleSwitcher />

        <article>
          <BlogPostTimestamp
            createdAt={blogPost.createdAt}
            lastModifiedAt={blogPost.createdAt}
          />

          <_BlogPostTitle>{blogPost.title}</_BlogPostTitle>

          <PrettyMarkdown>{blogPost.body}</PrettyMarkdown>
        </article>
      </RightPane>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 320px calc(100% - 320px - 64px);
  grid-template-areas: "left right";
  column-gap: 64px;
  max-width: 1080px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-start: 80px;
  padding-block-end: 80px;
  padding-inline-end: 64px;
`;

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: left;
`;

const RightPane = styled.div`
  grid-area: right;
`;

const _BlogPostTitle = styled(BlogPostTitle)`
  margin-block-start: 32px;
`;
