import { withKnobs, text, select, boolean, number } from  "@storybook/addon-knobs";
import * as React from "react";
import Text, { TextSize, TextAlignment } from "./Text";
import { ForegroundColor } from "../constant/color";

export default {
  title: "Text",
  decorators: [withKnobs],
};

export const playground = () => (
  <Text
    color={select("color", {
      normal: ForegroundColor.normal,
      primary: ForegroundColor.primary,
      primaryHighlight: ForegroundColor.primaryHighlight,
      secondary: ForegroundColor.secondary,
      secondaryHighlight: ForegroundColor.secondaryHighlight,
      highlight: ForegroundColor.highlight,
    }, ForegroundColor.normal)}
    size={select("size", {
      title: TextSize.title,
      subtitle2: TextSize.subtitle2,
      subtitle: TextSize.subtitle,
      body: TextSize.body,
      caption: TextSize.caption,
    }, TextSize.body)}
    bold={boolean("bold", false)}
    link={boolean("link", false)}
    maxLines={number("maxLines", 0, { range: true, min: 0, max: 100 })}
    alignment={select("alignment", {
      default: TextAlignment.default,
      start: TextAlignment.start,
      end: TextAlignment.end,
      center: TextAlignment.center,
    }, TextAlignment.default)}
    selectable={boolean("selectable", true)}
    children={text("children", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget.")}
  />
);
