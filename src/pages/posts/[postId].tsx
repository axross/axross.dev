import styled from "@emotion/styled";
import * as Contentful from "contentful";
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
import BlogPost from "../../entities/BlogPost";
import { NextPageContext } from "next";
import ContentfulBlogPostApi from "../../repositories/ContentfulBlogPostApi";

interface Props {
  blogPostJSON?: Record<string, any>;
}

export default function BlogPostPage({ blogPostJSON }: Props) {
  const router = useRouter();
  const blogPostId = router.query.postId;
  const deserializedBlogPost = blogPostJSON ? deserializeBlogPost(blogPostJSON) : null;
  const [blogPost, isBlogPostLoading] = useBlogPost(blogPostId.toString());
  useLoggingPageView(blogPost, isBlogPostLoading);

  return (
    <>
      <Head
        blogPost={blogPost ?? deserializedBlogPost}
        blogPostLoading={deserializedBlogPost ? false : isBlogPostLoading}
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

BlogPostPage.getInitialProps = async ({ query, asPath, req }: NextPageContext): Promise<Props> => {
  if (req) {
    const url = new URL(asPath!, process.env.ORIGIN);
    const currentLocale = url.searchParams.get("hl")!;
    const contentful = Contentful.createClient({
      // do not specify hosts and preview access token for safety
      space: process.env.CONTENTFUL_SPACE!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
    const blogPostApi = new ContentfulBlogPostApi(contentful);
    const blogPost = await blogPostApi.getByIdAndLocale(query.postId.toString(), currentLocale);

    return { blogPostJSON: serializeBlogPost(blogPost) };
  }

  return {};
};

function serializeBlogPost(blogPost: BlogPost): Record<string, any> {
  return {
    id: blogPost.id,
    createdAt: blogPost.createdAt.toJSON(),
    lastModifiedAt: blogPost.lastModifiedAt.toJSON(),
    title: blogPost.title,
    summary: blogPost.summary,
    body: blogPost.body,
  };
}

function deserializeBlogPost(json: Record<string, any>): BlogPost {
  return {
    id: json.id,
    createdAt: new Date(json.createdAt),
    lastModifiedAt: new Date(json.lastModifiedAt),
    title: json.title,
    summary: json.summary,
    body: json.body,
  };
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

