import { type Meta, type StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "<Avatar>",
  component: Avatar,
  subcomponents: { AvatarFallback, AvatarImage },
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

export const Primary: Story = {};
