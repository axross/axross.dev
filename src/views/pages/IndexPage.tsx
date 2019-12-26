import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import Person from "../../entities/Person";
import ScreenSizeContext, { ScreenSize } from "../components/ScreenSizeContext";
import TwoPaneLayout from './IndexPage/TwoPaneLayout';
import VerticalLayout from "./IndexPage/VerticalLayout";

export interface Props {
  myself: Person;
  blogPosts: BlogPost[];
}

export default function IndexPage({ myself, blogPosts }: Props) {
  const screenSize = React.useContext(ScreenSizeContext);

  if (screenSize === ScreenSize.laptop) {
    return <TwoPaneLayout person={myself} blogPosts={blogPosts} />
  }

  return <VerticalLayout person={myself} blogPosts={blogPosts} />;
}
