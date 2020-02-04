import styled from "@emotion/styled";
import { useRouter } from "next/router";
import * as React from "react";
import HeadBar from "../../components/HeadBar";
import Article from "../../components/pages/posts/[postId]/Article";
import ArtcileLoader from "../../components/pages/posts/[postId]/ArticleLoader";
import ArticleNotFound from "../../components/pages/posts/[postId]/ArticleNotFound";
import Head from "../../components/pages/posts/[postId]/Head";
import useBlogPost from "../../components/pages/posts/[postId]/useBlogPost";
import useLoggingPageView from "../../components/pages/posts/[postId]/useLoggingPageView";
import { MOBILE } from "../../constant/mediaQuery";

export default function BlogPostPage() {
  const router = useRouter();
  const blogPostId = router.query.postId;
  const [blogPost, isBlogPostLoading] = useBlogPost(blogPostId as any);
  useLoggingPageView(blogPost, isBlogPostLoading);

  return (
    <>
      <Head blogPost={blogPost} blogPostLoading={isBlogPostLoading} />

      <Root>
        <_HeadBar />

        {isBlogPostLoading ? (
          <_ArtcileLoader />
        ) : blogPost ? (
          <_Article blogPost={blogPost} />
        ) : (
          <_ArticleNotFound />
        )}
      </Root>
    </>
  );
}

const Root = styled.div`
  --max-width: 1080px;
  --width: min(var(--max-width), 100%);
  display: grid;
  grid-template-columns: calc((var(--width) - 640px) / 2) 640px calc((var(--width) - 640px) / 2);
  grid-template-rows: auto 32px auto;
  grid-template-areas:
    "head-bar head-bar head-bar"
    ". . ."
    ". article .";
  max-width: var(--max-width);
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-end: 128px;

  ${MOBILE} {
    --max-width: 480px;
    grid-template-columns: 20px calc(100% - 20px - 20px) 20px;
    grid-template-rows: auto auto;
    grid-template-areas: "head-bar head-bar head-bar" ". article .";
    padding-block-end: 64px;
  }
`;

const _HeadBar = styled(HeadBar)`
  grid-area: head-bar;
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

