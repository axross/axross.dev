import * as Contentful from "contentful";
import { NextPageContext } from "next";
import * as React from "react";
import BlogPostPage from "../../components/BlogPostPage";
import { SELF_URL } from "../../constant/general";
import BlogPost from "../../entities/BlogPost";
import { createGetBlogPost } from "../../repositories/blogPost/contentful/getBlogPost";

interface Props {
  blogPostJSON?: Record<string, any>;
}

export default function Page({ blogPostJSON }: Props) {
  const blogPost = blogPostJSON ? deserializeBlogPost(blogPostJSON) : undefined;

  return <BlogPostPage prefetchedBlogPost={blogPost} />;
}

Page.getInitialProps = async ({
  query,
  asPath,
  req,
}: NextPageContext): Promise<Props> => {
  if (req) {
    const url = new URL(asPath!, SELF_URL.origin);
    const currentLocale = url.searchParams.get("hl")!;
    const contentful = Contentful.createClient({
      // do not specify hosts and preview access token for safety
      space: process.env.CONTENTFUL_SPACE!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
    const getBlogPost = createGetBlogPost(contentful);
    const blogPost = await getBlogPost({
      id: `${query.postId}`,
      locale: currentLocale,
    });

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
