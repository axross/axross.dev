import {
  withKnobs,
  text,
  select,
  number
} from "@storybook/addon-knobs";
import * as React from "react";
import { ThemedColor } from "../../entities/ColorTheme";
import Text, { TextType, TextAlignment } from "./Text";

export default {
  title: "Text",
  decorators: [withKnobs]
};

export const overview = () => (
  <div>
    <p>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget.</Text>
    </p>
    
    <p>
      <Text type={TextType.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget.</Text>
    </p>

    <p>
      <Text type={TextType.label}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget.</Text>
    </p>
  </div>
)

export const playground = () => (
  <Text
    color={select(
      "color",
      {
        foreground: ThemedColor.foreground,
        primaryForeground: ThemedColor.primaryForeground,
        accentBackground: ThemedColor.accentBackground,
        emphasizedForeground: ThemedColor.emphasizedForeground,
        secondaryForeground: ThemedColor.secondaryForeground,
        highlight: ThemedColor.whiteForeground
      },
      ThemedColor.foreground
    )}
    type={select(
      "size",
      {
        body: TextType.body,
        subtitle: TextType.subtitle,
        label: TextType.label
      },
      TextType.body
    )}
    maxLines={number("maxLines", 0, { range: true, min: 0, max: 100 })}
    alignment={select(
      "alignment",
      {
        default: TextAlignment.default,
        start: TextAlignment.start,
        end: TextAlignment.end,
        center: TextAlignment.center
      },
      TextAlignment.default
    )}
    children={text(
      "children",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget."
    )}
  />
);
