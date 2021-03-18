import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { JapanFlag, UnitedStatesFlag, CountryFlagProps } from "./country-flag";

export default {
  title: "Components/CountryFlag",
  component: JapanFlag,
  argTypes: {
    className: { control: false },
  },
  args: {
    style: {
      width: 128,
    },
  },
} as Meta;

export const Japan: Story<CountryFlagProps> = (props) => (
  <JapanFlag {...props} />
);

export const UnitedStates: Story<CountryFlagProps> = (props) => (
  <UnitedStatesFlag {...props} />
);
