import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { Empty as _Empty, IllustrationProps } from "./illustration";

export default {
  title: "Components/Illustration",
  component: _Empty,
  argTypes: {
    className: { control: false },
  },
  args: {
    style: { width: 256 },
  },
} as Meta;

export const Empty: Story<IllustrationProps> = (props) => <_Empty {...props} />;
