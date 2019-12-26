import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import Person from "../../entities/Person";
import ScreenSizeContext, { ScreenSize } from "../components/ScreenSizeContext";
import TwoPaneLayout from './BlogPostPage/TwoPaneLayout';
import VerticalLayout from './BlogPostPage/VerticalLayout';

export interface Props {
  myself: Person;
  blogPost: BlogPost;
}

export default function BlogPostPage({ myself, blogPost }: Props) {
  const screenSize = React.useContext(ScreenSizeContext);

  if (screenSize === ScreenSize.laptop) {
    return <TwoPaneLayout person={myself} blogPost={blogPost} />
  }

  return <VerticalLayout person={myself} blogPost={blogPost} />;
}
