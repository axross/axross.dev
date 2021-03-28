import { Story, Meta } from "@storybook/react";
import * as React from "react";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
  TwoColumnPageLayoutProps,
} from "./page-layout";

export default {
  title: "Components/TwoColumnPageLayout",
  component: TwoColumnPageLayout,
  subcomponents: {
    TwoColumnPageLayoutAside,
    TwoColumnPageLayoutFooter,
    TwoColumnPageLayoutMain,
  },
  argTypes: {},
  args: {},
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const TwoColumn: Story<TwoColumnPageLayoutProps> = (props) => (
  <TwoColumnPageLayout {...props}>
    <TwoColumnPageLayoutMain>
      <div>This is main</div>
    </TwoColumnPageLayoutMain>

    <TwoColumnPageLayoutAside>
      <div>This is aside</div>
    </TwoColumnPageLayoutAside>

    <TwoColumnPageLayoutFooter />
  </TwoColumnPageLayout>
);
