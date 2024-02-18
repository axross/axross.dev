import { type Meta, type StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta = {
  component: Spinner,
  args: {
    style: {
      blockSize: 24,
      inlineSize: 24,
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};

export const Danger: Story = {
  args: {
    style: {
      blockSize: 24,
      inlineSize: 24,
      color: "var(--danger-5)",
    },
  },
};
