import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import useLocale from "../../../hooks/useLocale";
import Link from "../../Link";
import UIText, { UITextType } from "../../UIText";
import useTranslation from "../../../hooks/useTranslation";

interface Props extends React.Attributes {
  blogPost: BlogPost;
  className?: string;
}

export default function FirstNBlogPostListItem({ blogPost, ...props }: Props) {
  const { currentLocale } = useLocale();
  const timestamp = useTranslation("BLOG_POST_TIMETAMP", {
    createdAt: new Intl.DateTimeFormat(currentLocale).format(
      blogPost?.createdAt
    ),
  });

  return (
    <Root {...props}>
      <Title>
        <Link
          href={{ pathname: "/posts/[postId]", query: { hl: currentLocale } }}
          as={{
            pathname: `/posts/${blogPost.id}`,
            query: { hl: currentLocale },
          }}
        >
          <UIText>{blogPost.title}</UIText>
        </Link>
      </Title>

      <Timestamp type={UITextType.caption}>{timestamp}</Timestamp>
    </Root>
  );
}

const Root = styled.li`
  display: grid;
  grid-template-areas: "title" "timestamp";
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
