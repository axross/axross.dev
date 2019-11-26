import { NextPageContext } from "next";
import * as React from "react";
import { AVAILABLE_LOCALES } from "../constant/locale";
import { jsonifyBlogPost, parseJsonToBlogPost } from "../parsers/blogPost";
import { getAllBlogPosts } from "../repositories/blogPostRepository";
import getLocale from "../utility/getLocale";
import IndexPage, { Props as IndexPageProps } from "../views/pages/IndexPage";

interface Props extends Omit<IndexPageProps, "blogPosts"> {
  blogPostsJson: any;
}

export default function Route(props: Props) {
  return React.createElement(IndexPage, {
    ...props,
    blogPosts: props.blogPostsJson.map((item: any) => parseJsonToBlogPost(item))
  });
}

Route.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const locale = getLocale(query);
  const blogPosts = await getAllBlogPosts({ locale: locale });

  return {
    blogPostsJson: blogPosts.map(blogPost => jsonifyBlogPost(blogPost)),
    availableLocales: AVAILABLE_LOCALES
  };
};
