import { CheckCircleIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { type Meta, type StoryObj } from "@storybook/react";
import buttonMeta from "../button/button.stories";
import { ActionButton } from "./action-button";

const timeoutDuration = 3000;

const meta = {
  component: ActionButton,
  argTypes: {
    ...buttonMeta.argTypes,
    icon: { type: "string" },
    loadingChildren: { type: "string" },
    doneIcon: { type: "string" },
    doneChildren: { type: "string" },
  },
  args: {
    ...buttonMeta.args,
    action: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, timeoutDuration);
      });
    },
  },
} satisfies Meta<typeof ActionButton>;

type Story = StoryObj<typeof meta>;

export const CopyButtonSolidNeutral: Story = {
  name: "Copy Button",
  args: {
    variant: "solid",
    intent: "neutral",
    icon: ClipboardIcon,
    loadingChildren: "Copying...",
    doneIcon: CheckCircleIcon,
    doneChildren: "Copied!",
    children: "Copy",
  },
};

export const CopyButtonOutlineNeutral: Story = {
  name: "Outline",
  args: {
    ...CopyButtonSolidNeutral.args,
    variant: "outline",
  },
};

export const CopyButtonGhostNeutral: Story = {
  name: "Ghost",
  args: {
    ...CopyButtonSolidNeutral.args,
    variant: "ghost",
  },
};

export default meta;
