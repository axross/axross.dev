import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { MOBILE } from "../../../constant/mediaQuery";
import { BLOG_POST_TIMETAMP } from "../../../dictionary";
import BlogPost from "../../../entities/BlogPost";
import useLocale from "../../../hooks/useLocale";
import Link from "../../Link";
import UIText, { UITextType } from "../../UIText";

interface Props extends React.Attributes {
  blogPosts: BlogPost[];
  className?: string;
}

export default function FirstNBlogPosts({ blogPosts, ...props }: Props) {
  const { currentLocale } = useLocale();

  return (
    <Root {...props}>
      {blogPosts.map(blogPost => (
        <Item key={blogPost.id}>
          <Title>
            <Link
              href={{ pathname: "/posts/[postId]", query: { hl: currentLocale } }}
              as={{ pathname: `/posts/${blogPost.id}`, query: { hl: currentLocale } }}
            >
              <UIText>{blogPost.title}</UIText>
            </Link>
          </Title>

          <Timestamp type={UITextType.caption}>
            {new IntlMessageFormat(BLOG_POST_TIMETAMP[currentLocale]).format({
              createdAt: new Intl.DateTimeFormat(currentLocale).format(
                blogPost.createdAt
              )
            })}
          </Timestamp>
        </Item>
      ))}
    </Root>
  );
}

const Root = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: grid;
  grid-template-areas: "title" "timestamp";
  margin-block-start: 32px;

  ${MOBILE} {
    margin-block-start: 24px;
  }

  &:first-of-type {
    margin-block-start: 0;
  }
`;

const Title = styled.h3`
  grid-area: title;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Timestamp = styled(UIText)`
  grid-area: timestamp;
  margin-block-start: 8px;
`;
