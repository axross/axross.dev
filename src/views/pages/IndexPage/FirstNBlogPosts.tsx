import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import { MOBILE } from "../../constant/mediaquery";
import { MOBILE_PADDING_SIZE, LAPTOP_PADDING_SIZE } from "../../constant/size";
import LocaleContext from "../../contexts/LocaleContext";
import TranslationContext from "../../contexts/TranslationContext";
import LinkKeepLocale from "../../components/KeepLocaleLink";
import Text, { TextColor, TextSize } from "../../components/Text";

interface Props extends React.Attributes {
  blogPosts: BlogPost[];
  className?: string;
}

export default function FirstNBlogPosts({ blogPosts, ...props }: Props) {
  const { currentLocale } = React.useContext(LocaleContext);
  const translation = React.useContext(TranslationContext);

  return (
    <Root {...props}>
      {blogPosts.map(blogPost => (
        <Item key={blogPost.id}>
          <Title>
            <LinkKeepLocale
              href="/posts/[blogPostId]"
              as={`/posts/${blogPost.id}`}
              passHref
            >
              <a>
                <Text maxLines={0} link>
                  {blogPost.title}
                </Text>
              </a>
            </LinkKeepLocale>
          </Title>

          <CreateDate color={TextColor.secondary} size={TextSize.caption}>
            {new IntlMessageFormat(translation["blogPost.written_at"]).format({
              createdAt: new Intl.DateTimeFormat(currentLocale).format(
                blogPost.createdAt
              )
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

  ${MOBILE} {
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
