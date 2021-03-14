import * as React from "react";
import { Story, Meta } from "@storybook/react";

import { Blockquote, BlockquoteProps } from "./blockquote";

export default {
  title: "Components/Blockquote",
  component: Blockquote,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
} as Meta;

export const Example: Story<BlockquoteProps> = (props) => (
  <Blockquote {...props} />
);
