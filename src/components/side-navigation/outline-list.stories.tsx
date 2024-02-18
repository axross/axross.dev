import { type Meta, type StoryObj } from "@storybook/react";
import { OutlineList } from "./outline-list";
import { OutlineListItem } from "./outline-list-item";

const meta = {
  component: OutlineList,
  args: {
    children: (
      <>
        <OutlineListItem href="/" level={2}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={4}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={4}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={2}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={2}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={3}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={4}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>

        <OutlineListItem href="/" level={5}>
          {"Lorem ipsum dolor sit amet"}
        </OutlineListItem>
      </>
    ),
  },
} satisfies Meta<typeof OutlineList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
