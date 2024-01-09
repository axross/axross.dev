import { type Meta, type StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import { AmericanFlag, JapaneseFlag } from "./country-flag";

const meta = {
  title: "<Select>",
  component: Select,
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="light">{"Light"}</SelectItem>

          <SelectItem value="dark">{"Dark"}</SelectItem>

          <SelectItem value="system">{"System"}</SelectItem>
        </SelectContent>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const Abort: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>{"Locale"}</SelectLabel>

            <SelectItem value="en-US">
              <div className="flex items-center gap-x-1.5">
                <AmericanFlag className="w-4 h-4" />

                {"English"}
              </div>
            </SelectItem>

            <SelectItem value="japanese">
              <div className="flex items-center gap-x-1.5">
                <JapaneseFlag className="w-4 h-4" />

                {"Japanese"}
              </div>
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>{"Theme"}</SelectLabel>

            <SelectItem value="system">{"System"}</SelectItem>

            <SelectItem value="light">{"Light"}</SelectItem>

            <SelectItem value="dark">{"Dark"}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </>
    ),
  },
};
