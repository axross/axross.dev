import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { ImageFigure, ImageFigureProps } from "./image-figure";

export default {
  title: "Components/ImageFigure",
  component: ImageFigure,
  argTypes: {
    className: { control: false },
    caption: { control: { type: "text" } },
    src: { control: { type: "text" } },
    width: {
      control: {
        type: "number",
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
      },
    },
    height: {
      control: {
        type: "number",
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
      },
    },
  },
  args: {
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    src: "/1280x800.jpg",
    width: 1280,
    height: 800,
  },
} as Meta;

export const Example: Story<ImageFigureProps> = (props) => (
  <ImageFigure {...props} />
);
