import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { LocaleSwitcher, LocaleSwitcherProps } from "./locale-switcher";

export default {
  title: "Components/LocaleSwitcher",
  component: LocaleSwitcher,
  argTypes: {
    className: { control: false },
  },
  args: {},
} as Meta;

export const Example: Story<LocaleSwitcherProps> = (props) => (
  <LocaleSwitcher {...props} />
);
