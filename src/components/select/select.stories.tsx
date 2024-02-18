import { type Meta, type StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../select";

const meta = {
  component: Select,
  args: {
    children: (
      <>
        <SelectTrigger>
          <SelectValue placeholder="Theme" />

          <SelectIcon />
        </SelectTrigger>

        <SelectPortal>
          <SelectContent>
            <SelectScrollUpButton />

            <SelectViewport>
              <SelectItem value="light">
                <SelectItemIndicator />

                <SelectItemText>{"Light"}</SelectItemText>
              </SelectItem>

              <SelectItem value="dark">
                <SelectItemIndicator />

                <SelectItemText>{"Dark"}</SelectItemText>
              </SelectItem>

              <SelectItem value="system">
                <SelectItemIndicator />

                <SelectItemText>{"System"}</SelectItemText>
              </SelectItem>
            </SelectViewport>

            <SelectScrollDownButton />
          </SelectContent>
        </SelectPortal>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const AlwaysOpen: Story = {
  args: {
    open: true,
  },
};
