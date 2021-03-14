import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { PostList, PostListItem, PostListProps } from "./post-list";
import { TableOfContents, TableOfContentsItem } from "./table-of-contents";

export default {
  title: "Components/PostList",
  component: PostList,
  argTypes: {
    className: { control: false },
  },
  args: {},
} as Meta;

export const Example: Story<PostListProps> = (props) => (
  <PostList {...props}>
    <PostListItem href="/path/to/[page]" as="/path/to/lorem-ipsum">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua deserunt mollit anim id
      est laborum
    </PostListItem>

    <PostListItem href="/path/to/[page]" as="/path/to/ut-enum-ad">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat
    </PostListItem>

    <PostListItem href="/path/to/[page]" as="/path/to/duis-aute">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur
    </PostListItem>

    <PostListItem href="/path/to/[page]" as="/path/to/excepteur">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum
    </PostListItem>
  </PostList>
);

export const WithTableOfContents: Story<PostListProps> = (props) => (
  <PostList {...props}>
    <PostListItem href="/path/to/[page]" as="/path/to/lorem-ipsum">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua deserunt mollit anim id
      est laborum
    </PostListItem>

    <PostListItem
      href="/path/to/[page]"
      as="/path/to/ut-enum-ad"
      tableOfContents={
        <TableOfContents>
          <TableOfContentsItem targetId="directives" level={2}>
            Enim lobortis scelerisque fermentum dui faucibus in ornare quam
          </TableOfContentsItem>

          <TableOfContentsItem targetId="kind-of-directives" level={3}>
            Sagittis purus sit amet volutpat
          </TableOfContentsItem>

          <TableOfContentsItem
            targetId="content-security-policy-report-only"
            level={3}
          >
            Maecenas sed enim ut sem viverra aliquet
          </TableOfContentsItem>

          <TableOfContentsItem targetId="default-src-and-none" level={4}>
            Posuere morbi
          </TableOfContentsItem>

          <TableOfContentsItem targetId="default-src-and-none" level={4}>
            Lectus proin nibh nisl condimentum id venenatis a condimentum vitae
          </TableOfContentsItem>

          <TableOfContentsItem targetId="script-src-and-default-src" level={2}>
            Felis eget nunc lobortis mattis. Velit laoreet id donec ultrices
            tincidunt
          </TableOfContentsItem>
        </TableOfContents>
      }
    >
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat
    </PostListItem>

    <PostListItem href="/path/to/[page]" as="/path/to/duis-aute">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur
    </PostListItem>

    <PostListItem href="/path/to/[page]" as="/path/to/excepteur">
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum
    </PostListItem>
  </PostList>
);
