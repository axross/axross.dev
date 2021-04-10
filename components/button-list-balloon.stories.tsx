import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { Facebook, Twitter } from "react-feather";
import {
  ButtonListBalloon,
  ButtonListBalloonProps,
  ButtonListBaloonItem,
} from "./button-list-balloon";

export default {
  title: "Components/ButtonListBalloon",
  component: ButtonListBalloon,
  subcomponents: { ButtonListBaloonItem },
  argTypes: {},
  args: {},
} as Meta;

export const Example: Story<ButtonListBalloonProps> = (props) => (
  <ButtonListBalloon {...props}>
    <ButtonListBaloonItem>Click me</ButtonListBaloonItem>

    <ButtonListBaloonItem icon={<Facebook />} />

    <ButtonListBaloonItem icon={<Twitter />}>Click me</ButtonListBaloonItem>
  </ButtonListBalloon>
);
