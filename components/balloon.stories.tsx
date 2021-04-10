import * as React from "react";
import { Story, Meta } from "@storybook/react";
import { Balloon, BalloonProps } from "./balloon";

export default {
  title: "Components/Balloon",
  component: Balloon,
  argTypes: {},
  args: {
    children: <div style={{ width: 200, height: 200 }}>200x200</div>,
  },
} as Meta;

export const Example: Story<BalloonProps> = (props) => <Balloon {...props} />;
