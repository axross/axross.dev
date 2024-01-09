import { type Meta, type StoryObj } from "@storybook/react";
import { OutlineList, OutlineListItem } from "./outline-list";

const meta = {
  title: "<OutlineList>",
  component: OutlineList,
  subcomponents: { OutlineListItem },
  args: {
    children: (
      <>
        <OutlineListItem href="/" level={2}>
          Hello!
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          Hello!
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          Hello!
        </OutlineListItem>
      </>
    ),
  },
} satisfies Meta<typeof OutlineList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
