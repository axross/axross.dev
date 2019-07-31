import { NextPageContext } from "next";
import * as React from "react";
import { jsonifyBlogPost, parseJsonToBlogPost } from "../../parsers/blogPost";
import { getBlogPostById } from "../../repositories/blogPostRepository";
import getLocale from "../../utility/getLocale";
import BlogPostPage, {
  Props as BlogPostPageProps
} from "../../views/pages/BlogPostPage";

interface Props extends Omit<BlogPostPageProps, "blogPost"> {
  blogPostJson: any;
}

function Route(props: any) {
  return React.createElement(BlogPostPage, {
    ...props,
    blogPost: parseJsonToBlogPost(props.blogPostJson)
  });
}

Route.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const locale = getLocale(query);
  const [blogPost, availableLocales] = await getBlogPostById(
    query.blogPostId as string,
    {
      locale: locale,
      previewAccessToken: query.preview as string
    }
  );

  return {
    availableLocales,
    blogPostJson: jsonifyBlogPost(blogPost)
  };
};

export default Route;
