import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../entities/BlogPost";
import HeadBar from "../components/HeadBar";
import { MOBILE } from "../constant/mediaQuery";
import FirstNBlogPosts from "./IndexPage/FirstNBlogPosts";
import FirstNBlogPostsHeading from "./IndexPage/FirstNBlogPostsHeading";
import FirstNBlogPostsLoader from "./IndexPage/FirstNBlogPostsLoader";
import TwoParagraphLoader from "./IndexPage/TwoParagraphLoader";
import WebsitePurpose from "./IndexPage/WebsitePurpose";
import WebsitePurposeHeading from "./IndexPage/WebsitePurposeHeading";
import Whoami from "./IndexPage/Whoami";

export interface Props {
  bio: string | null;
  blogPosts: BlogPost[];
  bioLoading: boolean;
  blogPostsLoading: boolean;
  websitePurpose: string | null;
  websitePurposeLoading: boolean;
}

export default function IndexPage({
  bio,
  blogPosts,
  bioLoading,
  blogPostsLoading,
  websitePurpose,
  websitePurposeLoading,
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

      <_WebsitePurposeHeading />

      {websitePurposeLoading ? (
        <_WebsitePurposeLoader />
      ) : (
        <_WebsitePurpose>
          {websitePurpose!}
        </_WebsitePurpose>
      )}
    </Root>
  );
}

const Root = styled.div`
  --max-width: 1080px;
  --width: min(var(--max-width), 100%);
  display: grid;
  grid-template-columns: calc((var(--width) - 640px) / 2) 640px calc((var(--width) - 640px) / 2);
  grid-template-rows: auto 32px auto 64px auto 32px auto 64px auto 32px auto;
  grid-template-areas:
    "head-bar head-bar head-bar"
    ". . ."
    ". whoami ."
    ". . ."
    ". blog-post-list-heading ."
    ". . ."
    ". blog-post-list ."
    ". . ."
    ". website-purpose-heading ."
    ". . ."
    ". website-purpose .";
  max-width: var(--max-width);
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-end: 128px;

  ${MOBILE} {
    --max-width: 480px;
    grid-template-columns: 20px calc(100% - 20px - 20px) 20px;
    grid-template-rows: auto auto 48px auto 24px auto 48px auto 24px auto;
    grid-template-areas:
      "head-bar head-bar head-bar"
      ". whoami ." ". . ."
      ". blog-post-list-heading ."
      ". . ."
      ". blog-post-list ."
      ". . ."
      ". website-purpose-heading ."
      ". . ."
      ". website-purpose .";
    padding-block-start: 0;
    padding-block-end: 64px;
  }
`;

const _HeadBar = styled(HeadBar)`
  grid-area: head-bar;
`;

const _Whoami = styled(Whoami)`
  grid-area: whoami;
`;

const _WhoamiLoader = styled(TwoParagraphLoader)`
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

const _WebsitePurposeHeading = styled(WebsitePurposeHeading)`
  grid-area: website-purpose-heading;
`;

const _WebsitePurpose = styled(WebsitePurpose)`
  grid-area: website-purpose;
`;

const _WebsitePurposeLoader = styled(TwoParagraphLoader)`
  grid-area: website-purpose;
`
