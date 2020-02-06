import styled from "@emotion/styled";
import { useRouter } from "next/router";
import * as React from "react";
import { MOBILE } from "../constant/mediaQuery";
import BlogPost from "../entities/BlogPost";
import HeadBar from "./HeadBar";
import Article from "./BlogPostPage/Article";
import ArtcileLoader from "./BlogPostPage/ArticleLoader";
import ArticleNotFound from "./BlogPostPage/ArticleNotFound";
import Head from "./BlogPostPage/Head";
import useBlogPost from "./BlogPostPage/useBlogPost";
import useLoggingPageView from "./BlogPostPage/useLoggingPageView";

interface Props extends React.Attributes {
  prefetchedBlogPost?: BlogPost;
  className?: string;
}

export default function BlogPostPage({ prefetchedBlogPost }: Props) {
  const router = useRouter();
  const blogPostId = router.query.postId;
  const [blogPost, isBlogPostLoading] = useBlogPost(blogPostId.toString());
  useLoggingPageView(blogPost, isBlogPostLoading);

  return (
    <>
      <Head
        blogPost={blogPost ?? prefetchedBlogPost}
        blogPostLoading={prefetchedBlogPost ? false : isBlogPostLoading}
      />

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

