import { NextPageContext } from "next";
import * as React from "react";
import { AVAILABLE_LOCALES } from "../constant/locale";
import { jsonifyBlogPost, parseJsonToBlogPost } from "../parsers/blogPost";
import { jsonifyPerson, parseJsonToPerson } from "../parsers/person";
import { getAllBlogPosts } from "../repositories/blogPostRepository";
import { getMyself } from "../repositories/personRepository";
import getTranslation from "../repositories/translationRepository";
import getLocale from "../utility/getLocale";
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

Route.getInitialProps = async ({ query }: NextPageContext): Promise<Props> => {
  const locale = getLocale(query);
  const [blogPosts, myself, translation] = await Promise.all([
    getAllBlogPosts({ locale: locale }),
    getMyself({ locale: locale }),
    getTranslation(locale)
  ]);

  return {
    locale,
    availableLocales: AVAILABLE_LOCALES,
    translation,
    myselfJson: jsonifyPerson(myself),
    blogPostsJson: blogPosts.map(blogPost => jsonifyBlogPost(blogPost))
  };
};

export default Route;
