import { type Meta, type StoryObj } from "@storybook/react";
import { Callout, CalloutDescription, CalloutTitle } from "../callout";

const meta = {
  component: Callout,
  args: {
    intent: "neutral",
    children: (
      <>
        <CalloutTitle>{"Lorem ipsum dolor sit amet"}</CalloutTitle>

        <CalloutDescription>
          {
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        </CalloutDescription>
      </>
    ),
  },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Danger: Story = {
  args: {
    intent: "danger",
  },
};
