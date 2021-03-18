import { Story, Meta } from "@storybook/react";
import * as React from "react";
import {
  AppStoreBadge,
  AppStoreBadgeProps,
  GooglePlayBadge,
  GooglePlayBadgeProps,
} from "./mobile-app-store-link";

export default {
  title: "Components/Google Play and App Store Badge",
  component: GooglePlayBadge,
  argTypes: {
    className: { control: false },
  },
  args: {
    style: { height: 40 },
  },
} as Meta;

export const GooglePlay: Story<GooglePlayBadgeProps> = (props) => (
  <GooglePlayBadge {...props} />
);

export const AppStore: Story<AppStoreBadgeProps> = (props) => (
  <AppStoreBadge {...props} />
);
