import * as React from "react";
import { Mic } from "react-feather";
import { Story, Meta } from "@storybook/react";

import { Button, ButtonProps, ButtonSize, ButtonVariant } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [ButtonVariant.default, ButtonVariant.inverted],
      },
    },
    size: {
      control: {
        type: "select",
        options: [ButtonSize.sm, ButtonSize.md, ButtonSize.lg, ButtonSize.xl],
      },
    },
    icon: {
      control: false,
    },
  },
  args: {
    variant: ButtonVariant.default,
    size: ButtonSize.md,
    children: "Click me",
  },
} as Meta;

export const Basic: Story<ButtonProps> = (props) => <Button {...props} />;

export const WithIcon = Basic.bind({});
WithIcon.args = {
  icon: <Mic />,
};

export const OnlyIcon = Basic.bind({});
OnlyIcon.args = {
  icon: <Mic />,
  children: undefined,
};
