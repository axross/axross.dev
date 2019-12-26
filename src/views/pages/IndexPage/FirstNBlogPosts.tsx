import styled from "@emotion/styled";
import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import { ThemedColor } from "../../../entities/ColorTheme";
import BlogPost from "../../../entities/BlogPost";
import LocaleContext from "../../contexts/LocaleContext";
import TranslationContext from "../../contexts/TranslationContext";
import LinkKeepLocale from "../../components/KeepLocaleLink";
import ScreenSizeContext, { ScreenSize } from "../../components/ScreenSizeContext";
import Text, { TextType } from "../../components/Text";

interface Props extends React.Attributes {
  blogPosts: BlogPost[];
  className?: string;
}

export default function FirstNBlogPosts({ blogPosts, ...props }: Props) {
  const { currentLocale } = React.useContext(LocaleContext);
  const translation = React.useContext(TranslationContext);
  const screenSize = React.useContext(ScreenSizeContext);

  return (
    <Root {...props}>
      {blogPosts.map(blogPost => (
        <Item key={blogPost.id} _screenSize={screenSize}>
          <Title>
            <LinkKeepLocale
              href="/posts/[blogPostId]"
              as={`/posts/${blogPost.id}`}
              prefetch
            >
              <Text maxLines={0}>{blogPost.title}</Text>
            </LinkKeepLocale>
          </Title>

          <CreateDate
            color={ThemedColor.secondaryForeground}
            type={TextType.label}
          >
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

const Item = styled.li<{ _screenSize: ScreenSize }>`
  display: grid;
  grid-template-areas: "title" "createDate";
  margin-block-start: ${({ _screenSize }) => _screenSize === ScreenSize.laptop ? "32px" : "24px" };

  &:first-of-type {
    margin-block-start: 0;
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
