import { text, withKnobs, } from "@storybook/addon-knobs";
import * as React from "react";
import UIText, { UITextType } from "./UIText";

export default {
  title: "Components/UIText",
  decorators: [withKnobs],
  parameters: { waitForFontLoading: true },
};

export const label = () => (
  <UIText type={UITextType.label}>{text("children", INITIAL_CHILDREN)}</UIText>
);

export const smallLabel = () => (
  <UIText type={UITextType.smallLabel}>{text("children", INITIAL_CHILDREN)}</UIText>
);

export const caption = () => (
  <UIText type={UITextType.caption}>{text("children", INITIAL_CHILDREN)}</UIText>
);

export const subtitle = () => (
  <UIText type={UITextType.subtitle}>{text("children", INITIAL_CHILDREN)}</UIText>
);

export const subtitle2 = () => (
  <UIText type={UITextType.subtitle2}>{text("children", INITIAL_CHILDREN)}</UIText>
);

export const logo = () => (
  <UIText type={UITextType.logo}>{text("children", INITIAL_CHILDREN)}</UIText>
);

const INITIAL_CHILDREN = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget.";
