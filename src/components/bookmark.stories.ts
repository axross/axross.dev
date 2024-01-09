import { type Meta, type StoryObj } from "@storybook/react";
import { Bookmark } from "./bookmark";

const meta = {
  title: "<Bookmark>",
  component: Bookmark,
  args: {
    href: "https://example.com/",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageSrc: "https://picsum.photos/1280/720",
    iconImageSrc: "https://picsum.photos/64/64",
  },
} satisfies Meta<typeof Bookmark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const Short: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet.",
    description: "Ut enim ad minim veniam.",
  },
};

export const Missing: Story = {
  args: {
    title: undefined,
    description: undefined,
    imageSrc: undefined,
    iconImageSrc: undefined,
  },
};
