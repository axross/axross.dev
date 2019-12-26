import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import Person from "../../entities/Person";
import HeadBar from "../components/HeadBar";
import LocaleSwitcher from "../components/LocaleSwitcher";
import PrettyMarkdown from "../components/PrettyMarkdown";
import Profile from "./BlogPostPage/Profile";
import { MOBILE } from "../constant/mediaQuery";
import BlogPostTimestamp from "./BlogPostPage/BlogPostTimestamp";
import BlogPostTitle from "./BlogPostPage/BlogPostTitle";

export interface Props {
  person: Person;
  blogPost: BlogPost;
}

export default function BlogPostPage({ person, blogPost }: Props) {
  return (
    <Root>
      <_HeadBar />

      <_Profile person={person} />

      <_LocaleSwitcher />

      <Article>
        <BlogPostTitle>{blogPost.title}</BlogPostTitle>

        <_BlogPostTimestamp
          createdAt={blogPost.createdAt}
          lastModifiedAt={blogPost.createdAt}
        />

        <PrettyMarkdown>{blogPost.body}</PrettyMarkdown>
      </Article>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 320px 64px calc(100% - 320px - 64px - 64px) 64px;
  grid-template-rows: auto 32px auto;
  grid-template-areas:
    "profile . locale-switcher ."
    "profile . . ."
    "profile . article .";
  max-width: 1080px;
  margin-inline: auto;
  padding-block: 80px;

  ${MOBILE} {
    grid-template-columns: 20px calc(100% - 20px - 20px) 20px;
    grid-template-rows: auto 16px auto;
    grid-template-areas: "head-bar head-bar head-bar" ". . ." ". article .";
    max-width: 480px;
    padding-block-start: 0;
    padding-block-end: 48px;
  }
`;

const _HeadBar = styled(HeadBar)`
  grid-area: head-bar;
  display: none;

  ${MOBILE} {
    display: grid;
  }
`;

const _Profile = styled(Profile)`
  grid-area: profile;

  ${MOBILE} {
    display: none;
  }
`;

const _LocaleSwitcher = styled(LocaleSwitcher)`
  grid-area: locale-switcher;

  ${MOBILE} {
    display: none;
  }
`;

const Article = styled.article`
  grid-area: article;
`;

const _BlogPostTimestamp = styled(BlogPostTimestamp)`
  display: block;
  margin-block: 32px;
`;
