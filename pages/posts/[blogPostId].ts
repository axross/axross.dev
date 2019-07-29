import { NextPageContext } from "next";
import * as React from "react";
import { jsonifyBlogPost, parseJsonToBlogPost } from "../../parsers/blogPost";
import { jsonifyPerson, parseJsonToPerson } from "../../parsers/person";
import { getBlogPostById } from "../../repositories/blogPostRepository";
import { getMyself } from "../../repositories/personRepository";
import getTranslation from "../../repositories/translationRepository";
import getLocale from "../../utility/getLocale";
import getOriginIsomorphicly from "../../utility/getOriginIsomorphicly";
import BlogPostPage, {
  Props as BlogPostPageProps
} from "../../views/pages/BlogPostPage";

interface Props extends Omit<Omit<BlogPostPageProps, "blogPost">, "myself"> {
  blogPostJson: any;
  myselfJson: any;
}

function Route(props: any) {
  return React.createElement(BlogPostPage, {
    ...props,
    blogPost: parseJsonToBlogPost(props.blogPostJson),
    myself: parseJsonToPerson(props.myselfJson)
  });
}

Route.getInitialProps = async ({
  req,
  query
}: NextPageContext): Promise<Props> => {
  const locale = getLocale(query);
  const origin = getOriginIsomorphicly(req);
  const [[blogPost, availableLocales], myself, translation] = await Promise.all(
    [
      getBlogPostById(query.blogPostId as string, {
        locale: locale,
        previewAccessToken: query.preview as string
      }),
      getMyself({ locale: locale }),
      getTranslation(locale)
    ]
  );

  return {
    origin,
    locale,
    availableLocales,
    translation,
    myselfJson: jsonifyPerson(myself),
    blogPostJson: jsonifyBlogPost(blogPost)
  };
};

export default Route;
