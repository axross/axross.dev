import { type Meta, type StoryObj } from "@storybook/react";
import { AvatarFallback } from "./avatar-fallback.client";
import { AvatarImage } from "./avatar-image.client";
import { Avatar } from "./avatar.client";

const meta = {
  component: Avatar,
  args: {
    children: (
      <>
        <AvatarImage src="https://picsum.photos/256/256" />

        <AvatarFallback>{"KA"}</AvatarFallback>
      </>
    ),
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const General: Story = {};

export const Fallback: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://kohei.dev/non-existing-image" />

        <AvatarFallback>{"KA"}</AvatarFallback>
      </>
    ),
  },
};
