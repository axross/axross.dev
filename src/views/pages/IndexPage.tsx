import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import Person from "../../entities/Person";
import HeadBar from "../components/HeadBar";
import LocaleSwitcher from "../components/LocaleSwitcher";
import PrettyMarkdown from "../components/PrettyMarkdown";
import Profile from "./BlogPostPage/Profile";
import FirstNBlogPosts from "./IndexPage/FirstNBlogPosts";
import FirstNBlogPostsHeading from "./IndexPage/FirstNBlogPostsHeading";
import WhoamiHeading from "./IndexPage/WhoamiHeading";
import { MOBILE } from "../constant/mediaQuery";

export interface Props {
  person: Person;
  blogPosts: BlogPost[];
}

export default function IndexPage({ person, blogPosts }: Props) {
  return (
    <Root>
      <_HeadBar />

      <_Profile person={person} />

      <_LocaleSwitcher />

      <_WhoamiHeading />

      <_Whoami>
        <PrettyMarkdown>{person.description}</PrettyMarkdown>
      </_Whoami>

      <_BlogPostListHeading />

      <_BlogPostList blogPosts={blogPosts} />
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 320px 64px calc(100% - 320px - 64px - 64px) 64px;
  grid-template-rows: auto auto 32px auto 64px auto 32px auto;
  grid-template-areas:
    "profile . locale-switcher ."
    "profile . whoami-heading ."
    "profile . . ."
    "profile . whoami ."
    "profile . . ."
    "profile . blog-post-list-heading ."
    "profile . . ."
    "profile . blog-post-list .";
  max-width: 1080px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-start: 80px;
  padding-block-end: 80px;

  ${MOBILE} {
    grid-template-columns: 20px calc(100% - 20px - 20px) 20px;
    grid-template-rows: auto 16px auto 24px auto 48px auto 24px auto;
    grid-template-areas: "head-bar head-bar head-bar" ". . ." ". whoami-heading. " ". . ." ". whoami ." ". . ." ". blog-post-list-heading ." ". . ." ". blog-post-list .";
    max-width: 480px;
    padding-block-start: 0;
    padding-block-end: 48px;
  }
`;

const _HeadBar = styled(HeadBar)`
  grid-area: head-bar;
  display: none;

  ${MOBILE} {
    display: grid;
  }
`;

const _Profile = styled(Profile)`
  grid-area: profile;

  ${MOBILE} {
    display: none;
  }
`;

const _LocaleSwitcher = styled(LocaleSwitcher)`
  grid-area: locale-switcher;

  ${MOBILE} {
    display: none;
  }
`;

const _WhoamiHeading = styled(WhoamiHeading)`
  grid-area: whoami-heading;
`;

const _Whoami = styled.div`
  grid-area: whoami;
`;

const _BlogPostListHeading = styled(FirstNBlogPostsHeading)`
  grid-area: blog-post-list-heading;
`;

const _BlogPostList = styled(FirstNBlogPosts)`
  grid-area: blog-post-list;
`;
