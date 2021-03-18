import * as React from "react";
import { Story, Meta } from "@storybook/react";

import { Badge, BadgeProps } from "./badge";
import { HorizontalList } from "./layout";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {},
  args: {
    children: "Programming",
  },
} as Meta;

export const Example: Story<BadgeProps> = (props) => <Badge {...props} />;

export const List: Story<BadgeProps> = (props) => (
  <HorizontalList columnGap="var(--space-sm)" rowGap="var(--space-sm)">
    {Array.from({ length: 5 }, () => (
      <Badge {...props} />
    ))}
  </HorizontalList>
);
