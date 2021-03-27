import { Story, Meta } from "@storybook/react";
import * as React from "react";
import {
  FloatingSidebarButton,
  FloatingSidebarButtonProps,
} from "./floating-sidebar-button";

export default {
  title: "Components/FloatingSidebarButton",
  component: FloatingSidebarButton,
  argTypes: {
    className: { control: false },
  },
  args: {
    content: "Hello!",
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const Example: Story<FloatingSidebarButtonProps> = (props) => (
  <>
    <img
      src="https://i.picsum.photos/id/515/1280/1280.jpg?hmac=wpcdFefrM6BhacWw0k0ZF33nSoTzrRs5amNMhTKhl-o"
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
      }}
    />

    <FloatingSidebarButton {...props} />
  </>
);
