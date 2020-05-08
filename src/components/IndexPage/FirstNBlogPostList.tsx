import styled from "@emotion/styled";
import * as React from "react";
import { MOBILE } from "../../constant/mediaQuery";
import BlogPost from "../../entities/BlogPost";
import FirstNBlogPostListItem from "./FirstNBlogPostList/FirstNBlogPostList";

interface Props extends React.Attributes {
  blogPosts: BlogPost[];
  className?: string;
}

export default function FirstNBlogPostList({ blogPosts, ...props }: Props) {
  return (
    <Root {...props}>
      {blogPosts.map((blogPost) => (
        <Item blogPost={blogPost} key={blogPost.id} />
      ))}
    </Root>
  );
}

const Root = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled(FirstNBlogPostListItem)`
  margin-block-start: 32px;

  ${MOBILE} {
    margin-block-start: 24px;
  }

  &:first-of-type {
    margin-block-start: 0;
  }
`;
