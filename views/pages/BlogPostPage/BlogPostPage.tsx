import styled from "@emotion/styled";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import LocaleString from "../../../entities/LocaleString";
import AvailableLocalesContext from "../../components/AvailableLocalesContext";
import LocaleSwitcher from "../../components/LocaleSwitcher";
import PrettyMarkdown from "../../components/PrettyMarkdown";
import Head from "../../components/BlogPostHead";
import BlogPostTimestamp from "../../components/BlogPostTimestamp";
import Profile from "../../components/Profile";
import Text, { TextSize, TextColor } from "../../components/Text";
import TwoPaneView, { LeftPane, RightPane } from "../../components/TwoPaneView";
import { MEDIA_MOBILE } from "../../constant/mediaquery";
import {
  MOBILE_MAJOR_PADDING_SIZE,
  MOBILE_MINOR_PADDING_SIZE,
  MOBILE_SECTION_MARGIN_SIZE,
  LAPTOP_MAJOR_PADDING_SIZE,
  LAPTOP_PADDING_SIZE
} from "../../constant/size";

export interface Props {
  blogPost: BlogPost;
  availableLocales: LocaleString[];
}

function BlogPostPage({ blogPost, availableLocales }: Props) {
  return (
    <AvailableLocalesContext.Provider value={availableLocales}>
      <Head blogPost={blogPost} />

      <TwoPaneView>
        <LeftPane>
          <Profile />
        </LeftPane>

        <_RightPane>
          <_BlogPostTimestamp
            createdAt={blogPost.createdAt}
            lastModifiedAt={blogPost.lastModifiedAt}
          />

          <_LocaleSwitcher />

          <Title>
            <Text
              size={TextSize.title}
              color={TextColor.highlight}
              bold
              maxLines={0}
            >
              {blogPost.title}
            </Text>
          </Title>

          <Body>{blogPost.body}</Body>
        </_RightPane>
      </TwoPaneView>
    </AvailableLocalesContext.Provider>
  );
}

const _RightPane = styled(RightPane)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto ${LAPTOP_PADDING_SIZE}px auto ${LAPTOP_MAJOR_PADDING_SIZE}px auto;
  grid-template-areas: "timestamp localeSwitcher" ". ." "title title" ". ." "body body";
  column-gap: ${LAPTOP_PADDING_SIZE}px;
  align-content: flex-start;

  ${MEDIA_MOBILE} {
    grid-template-columns: 100%;
    grid-template-rows: auto ${MOBILE_MINOR_PADDING_SIZE}px auto ${MOBILE_MAJOR_PADDING_SIZE}px auto ${MOBILE_SECTION_MARGIN_SIZE}px auto;
    grid-template-areas: "localeSwitcher" "." "title" "." "body" "." "timestamp";
    column-gap: normal;
    padding-block-end: ${MOBILE_MAJOR_PADDING_SIZE}px;
  }
`;

const _BlogPostTimestamp = styled(BlogPostTimestamp)`
  grid-area: timestamp;
  justify-self: flex-end;
`;

const _LocaleSwitcher = styled(LocaleSwitcher)`
  grid-area: localeSwitcher;
  justify-self: flex-end;
`;

const Title = styled.h1`
  grid-area: title;
`;

const Body = styled(PrettyMarkdown)`
  grid-area: body;
`;

export default BlogPostPage;
