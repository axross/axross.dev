import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../common/entities/BlogPost";
import HeadBar from "../components/HeadBar";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { MOBILE } from "../constant/mediaQuery";
import Article from "./BlogPostPage/Article";
import ArtcileLoader from "./BlogPostPage/ArticleLoader";
import ArticleNotFound from "./BlogPostPage/ArticleNotFound";
import Profile from "./BlogPostPage/Profile";

export interface Props {
  blogPost: BlogPost | null;
  blogPostLoading: boolean;
}

export default function BlogPostPage({ blogPost, blogPostLoading }: Props) {
  return (
    <Root>
      <_HeadBar />

      <_Profile />

      <_LocaleSwitcher />

      {blogPostLoading ? (
        <_ArtcileLoader />
      ) : blogPost ? (
        <_Article blogPost={blogPost} />
      ) : (
        <_ArticleNotFound />
      )}
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
    "profile . article ."
    "profile . . .";
  max-width: 1080px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-start: 80px;
  padding-block-end: 80px;

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
  justify-self: flex-end;

  ${MOBILE} {
    display: none;
  }
`;

const _Article = styled(Article)`
  grid-area: article;
`;

const _ArtcileLoader = styled(ArtcileLoader)`
  grid-area: article;
`;

const _ArticleNotFound = styled(ArticleNotFound)`
  grid-area: article;
`;
