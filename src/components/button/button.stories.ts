import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  component: Button,
  argTypes: {
    intent: {
      control: "radio",
      options: ["action", "danger", "neutral"],
    },
    variant: {
      control: "radio",
      options: ["solid", "outline", "ghost"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Hello, world!",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: "solid",
    intent: "neutral",
  },
};

export const Outline: Story = {
  args: {
    ...Solid.args,
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    ...Solid.args,
    variant: "ghost",
  },
};

export const Small: Story = {
  args: {
    ...Solid.args,
    size: "sm",
  },
};
