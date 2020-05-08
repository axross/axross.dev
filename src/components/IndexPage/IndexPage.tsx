import styled from "@emotion/styled";
import * as React from "react";
import HeadBar from "../HeadBar";
import { MOBILE } from "../../constant/mediaQuery";
import FirstNBlogPostList from "./FirstNBlogPostList";
import FirstNBlogPostListHeading from "./FirstNBlogPostListHeading";
import FirstNBlogPostListLoader from "./FirstNBlogPostListLoader";
import Head from "./Head";
import WebsitePurpose from "./WebsitePurpose";
import WebsitePurposeHeading from "./WebsitePurposeHeading";
import WebsitePurposeLoader from "./WebsitePurposeLoader";
import Whoami from "./Whoami";
import WhoamiLoader from "./WhoamiLoader";
import useBio from "./useBio";
import useBlogPosts from "./useBlogPosts";
import useLoggingPageView from "./useLoggingPageView";
import useWebsitePurpose from "./useWebsitePurpose";

interface Props extends React.Attributes {
  className?: string;
}

export default function IndexPage(props: Props) {
  const [bio, isBioLoading] = useBio();
  const [websitePurpose, isWebsitePurposeLoading] = useWebsitePurpose();
  const [blogPosts, isBlogPostsLoading] = useBlogPosts();
  useLoggingPageView();

  return (
    <>
      <Head />

      <Root {...props}>
        <_HeadBar noLogo />

        {isBioLoading ? <_WhoamiLoader /> : <_Whoami bio={bio!} />}

        <_BlogPostListHeading />

        {isBlogPostsLoading ? (
          <_BlogPostListLoading />
        ) : (
          <_BlogPostList blogPosts={blogPosts} />
        )}

        <_WebsitePurposeHeading />

        {isWebsitePurposeLoading ? (
          <_WebsitePurposeLoader />
        ) : (
          <_WebsitePurpose>{websitePurpose!}</_WebsitePurpose>
        )}
      </Root>
    </>
  );
}

const Root = styled.div`
  --max-width: 1080px;
  --width: min(var(--max-width), 100%);
  display: grid;
  grid-template-columns: calc((var(--width) - 640px) / 2) 640px calc(
      (var(--width) - 640px) / 2
    );
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

const _WhoamiLoader = styled(WhoamiLoader)`
  grid-area: whoami;
`;

const _BlogPostListHeading = styled(FirstNBlogPostListHeading)`
  grid-area: blog-post-list-heading;
`;

const _BlogPostList = styled(FirstNBlogPostList)`
  grid-area: blog-post-list;
`;

const _BlogPostListLoading = styled(FirstNBlogPostListLoader)`
  grid-area: blog-post-list;
`;

const _WebsitePurposeHeading = styled(WebsitePurposeHeading)`
  grid-area: website-purpose-heading;
`;

const _WebsitePurpose = styled(WebsitePurpose)`
  grid-area: website-purpose;
`;

const _WebsitePurposeLoader = styled(WebsitePurposeLoader)`
  grid-area: website-purpose;
`;
