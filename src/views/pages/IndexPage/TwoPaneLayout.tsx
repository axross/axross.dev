import styled from "@emotion/styled";
import * as React from 'react';
import BlogPost from "../../../entities/BlogPost";
import Person from "../../../entities/Person";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import FirstNBlogPosts from "./FirstNBlogPosts";
import FirstNBlogPostsHeading from "./FirstNBlogPostsHeading";
import Profile from "../BlogPostPage/Profile";
import WhoamiHeading from "./WhoamiHeading";

interface Props extends React.Attributes {
  person: Person;
  blogPosts: BlogPost[];
  className?: string;
}

export default function TwoPaneLayout({ person, blogPosts, ...props}: Props) {
  return <Root {...props}>
    <LeftPane>
      <Profile person={person} />
    </LeftPane>

    <RightPane >
      <LocaleSwitcher />

      <WhoamiHeading />

      <_Whoami>
        <PrettyMarkdown {...props}>{person.description}</PrettyMarkdown>
      </_Whoami>

      <_FirstNBlogPostsHeading />

      <_FirstNBlogPosts blogPosts={blogPosts} />
    </RightPane>
  </Root>
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 320px calc(100% - 320px - 64px);
  grid-template-areas: "left right";
  column-gap: 64px;
  max-width: 1080px;
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-block-start: 80px;
  padding-block-end: 80px;
  padding-inline-end: 64px;
`;

const LeftPane = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: left;
`;

const RightPane = styled.div`
  grid-area: right;
`;

const _Whoami = styled.div`
  margin-block-start: 32px;
`;

const _FirstNBlogPostsHeading = styled(FirstNBlogPostsHeading)`
  margin-block-start: 64px;
`;

const _FirstNBlogPosts = styled(FirstNBlogPosts)`
  margin-block-start: 32px;
`;
