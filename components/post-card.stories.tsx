import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { HorizontalGrid } from "./layout";
import { PostCard, PostCardProps } from "./post-card";

export default {
  title: "Components/PostCard",
  component: PostCard,
  argTypes: {
    className: { control: false },
  },
  args: {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    tags: ["Web Frontend", "React", "Programming"],
    href: "https://example.kohei.dev",
    asHref: "https://example.kohei.dev",
  },
} as Meta;

export const Example: Story<PostCardProps> = (props) => (
  <PostCard {...props} style={{ width: 256 }} />
);

export const Grid: Story<PostCardProps> = (props) => (
  <HorizontalGrid itemMinWidth="256px">
    {Array.from({ length: 6 }, (_, index) => (
      <PostCard {...props} key={index} />
    ))}
  </HorizontalGrid>
);
