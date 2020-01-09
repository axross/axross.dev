import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../entities/BlogPost";
import HeadBar from "../components/HeadBar";
import { MOBILE } from "../constant/mediaQuery";
import FirstNBlogPosts from "./IndexPage/FirstNBlogPosts";
import FirstNBlogPostsHeading from "./IndexPage/FirstNBlogPostsHeading";
import FirstNBlogPostsLoader from "./IndexPage/FirstNBlogPostsLoader";
import Whoami from "./IndexPage/Whoami";
import WhoamiHeading from "./IndexPage/WhoamiHeading";
import WhoamiLoader from "./IndexPage/WhoamiLoader";

export interface Props {
  bio: string | null;
  blogPosts: BlogPost[];
  bioLoading: boolean;
  blogPostsLoading: boolean;
}

export default function IndexPage({
  bio,
  blogPosts,
  bioLoading,
  blogPostsLoading
}: Props) {
  return (
    <Root>
      <_HeadBar noLogo />

      {bioLoading ? (
        <_WhoamiLoader />
      ) : (
        <_Whoami bio={bio!} />
      )}

      <_BlogPostListHeading />

      {blogPostsLoading ? (
        <_BlogPostListLoading />
      ) : (
        <_BlogPostList blogPosts={blogPosts} />
      )}
    </Root>
  );
}

const Root = styled.div`
  --max-width: 1080px;
  --width: min(var(--max-width), 100%);
  display: grid;
  grid-template-columns: calc((var(--width) - 640px) / 2) 640px calc((var(--width) - 640px) / 2);
  grid-template-rows: auto 32px auto 64px auto 32px auto;
  grid-template-areas:
    "head-bar head-bar head-bar"
    ". . ."
    ". whoami ."
    ". . ."
    ". blog-post-list-heading ."
    ". . ."
    ". blog-post-list .";
  max-width: var(--max-width);
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-end: 128px;

  ${MOBILE} {
    --max-width: 480px;
    grid-template-columns: 20px calc(100% - 20px - 20px) 20px;
    grid-template-rows: auto auto 48px auto 24px auto;
    grid-template-areas:
      "head-bar head-bar head-bar"
      ". whoami ." ". . ."
      ". blog-post-list-heading ."
      ". . ."
      ". blog-post-list .";
    padding-block-start: 0;
    padding-block-end: 64px;
  }
`;

const _HeadBar = styled(HeadBar)`
  grid-area: head-bar;
`;

const _WhoamiHeading = styled(WhoamiHeading)`
  grid-area: whoami-heading;
`;

const _Whoami = styled(Whoami)`
  grid-area: whoami;
`;

const _WhoamiLoader = styled(WhoamiLoader)`
  grid-area: whoami;
`;

const _BlogPostListHeading = styled(FirstNBlogPostsHeading)`
  grid-area: blog-post-list-heading;
`;

const _BlogPostList = styled(FirstNBlogPosts)`
  grid-area: blog-post-list;
`;

const _BlogPostListLoading = styled(FirstNBlogPostsLoader)`
  grid-area: blog-post-list;
`;
