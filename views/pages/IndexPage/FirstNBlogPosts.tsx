import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import { MEDIA_MOBILE } from "../../constant/mediaquery";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import useFormatRelative from "../../hooks/useFormatRelative";
import useTranslation from "../../hooks/useTranslation";
import LinkKeepLocale from "../../components/KeepLocaleLink";
import LinkText from "../../components/LinkText";
import Text, { TextColor, TextSize } from "../../components/Text";

interface Props extends React.Attributes {
  blogPosts: BlogPost[];
  className?: string;
}

function FirstNBlogPosts({ blogPosts, ...props }: Props) {
  const translation = useTranslation();
  const formatRelative = useFormatRelative();

  return (
    <Root {...props}>
      {blogPosts.map(blogPost => (
        <Item key={blogPost.id}>
          <Title>
            <LinkKeepLocale
              href="/posts/[blogPostId]"
              as={`/posts/${blogPost.id}`}
              passHref
              prefetch
            >
              <LinkText multiline>{blogPost.title}</LinkText>
            </LinkKeepLocale>
          </Title>

          <CreateDate color={TextColor.secondary} size={TextSize.caption}>
            {new IntlMessageFormat(translation["blogPost.written_at"]).format({
              createdAt: formatRelative(blogPost.createdAt)
            })}
          </CreateDate>
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
  grid-template-areas: "title" "createDate";
  margin-block-start: ${LAPTOP_PADDING_SIZE}px;

  &:first-of-type {
    margin-block-start: 0;
  }

  ${MEDIA_MOBILE} {
    margin-block-start: ${MOBILE_PADDING_SIZE}px;
  }
`;

const Title = styled.h3`
  grid-area: title;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-block-end: 8px;
`;

const CreateDate = styled(Text)`
  grid-area: createDate;
  padding-block-end: 4px;
`;

export default FirstNBlogPosts;
