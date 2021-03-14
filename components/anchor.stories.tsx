import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { ParrotAnchor, ParrotAnchorProps } from "./anchor";

export default {
  title: "Components/ParrotAnchor",
  component: ParrotAnchor,
  argTypes: {
    onFocus: { action: "onFocus" },
    onBlur: { action: "onBlur" },
    onClick: { action: "onClick" },
    className: { control: false },
  },
  args: {
    href: "#",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
} as Meta;

export const Href: Story<ParrotAnchorProps> = (props) => (
  <ParrotAnchor {...props} />
);

export const OnClick = Href.bind({});
OnClick.args = {
  href: undefined,
};
