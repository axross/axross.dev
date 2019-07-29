import { NextPageContext } from "next";
import * as React from "react";
import { jsonifyBlogPost, parseJsonToBlogPost } from "../parsers/blogPost";
import { jsonifyPerson, parseJsonToPerson } from "../parsers/person";
import { getMyself } from "../repositories/personRepository";
import { getAllBlogPosts } from "../repositories/blogPostRepository";
import getLocale from "../utility/getLocale";
import getOriginIsomorphicly from "../utility/getOriginIsomorphicly";
import IndexPage, { Props as IndexPageProps } from "../views/pages/IndexPage";

interface Props extends Omit<Omit<IndexPageProps, "blogPosts">, "myself"> {
  blogPostsJson: any;
  myselfJson: any;
}

function Route(props: Props) {
  return React.createElement(IndexPage, {
    ...props,
    blogPosts: props.blogPostsJson.map((item: any) =>
      parseJsonToBlogPost(item)
    ),
    myself: parseJsonToPerson(props.myselfJson)
  });
}

Route.getInitialProps = async ({
  req,
  query
}: NextPageContext): Promise<Props> => {
  const locale = getLocale(query);
  const origin = getOriginIsomorphicly(req);
  const [blogPosts, myself] = await Promise.all([
    getAllBlogPosts({ locale: locale }),
    getMyself({ locale: locale })
  ]);

  return {
    blogPostsJson: blogPosts.map(blogPost => jsonifyBlogPost(blogPost)),
    myselfJson: jsonifyPerson(myself),
    locale,
    origin
  };
};

export default Route;
