import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { Callout, CalloutProps, CalloutVariant } from "./callout";

export default {
  title: "Components/Callout",
  component: Callout,
  argTypes: {
    className: { control: false },
    variant: {
      control: {
        type: "radio",
        options: {
          "CalloutVariant.info": CalloutVariant.info,
          "CalloutVariant.warning": CalloutVariant.warning,
        },
      },
    },
  },
  args: {
    variant: CalloutVariant.info,
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
} as Meta;

export const Info: Story<CalloutProps> = (props) => <Callout {...props} />;

export const Warning = Info.bind({});
Warning.args = {
  variant: CalloutVariant.warning,
};
