import { boolean, withKnobs, text, select, number } from "@storybook/addon-knobs";
import * as React from "react";
import ThemedColor from "../../types/ThemedColor";
import RawText from "./RawText";
import TextAlignment from "./TextAlignment";
import TextLineSize from "./TextLineSize";
import TextSize from "./TextSize";
import Typeface from "./Typeface";

export default {
  title: "Components/RawText",
  decorators: [withKnobs]
};

export const playground = () => (
  <RawText
    color={select(
      "color",
      {
        foreground: ThemedColor.foreground,
        emphasizedForeground: ThemedColor.emphasizedForeground,
        secondaryForeground: ThemedColor.secondaryForeground,
        primaryForeground: ThemedColor.primaryForeground,
        accentForeground: ThemedColor.accentForeground,
        whiteForeground: ThemedColor.whiteForeground,
      },
      ThemedColor.foreground
    )}
    typeface={select(
      "typeface",
      {
        body: Typeface.body,
        headline: Typeface.headline,
        monospace: Typeface.monospace,
      },
      Typeface.body
    )}
    size={select(
      "size",
      {
        giantic: TextSize.giantic,
        huge: TextSize.huge,
        large: TextSize.large,
        larger: TextSize.larger,
        default: TextSize.default,
        small: TextSize.small,
      },
      TextSize.default
    )}
    lineSize={select(
      "lineSize",
      {
        default: TextLineSize.default,
        large: TextLineSize.large,
      },
      TextLineSize.default
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
    bold={boolean("bold", false)}
    italic={boolean("italic", false)}
    underline={boolean("underline", false)}
    lineThrough={boolean("lineThrough", false)}
    children={text(
      "children",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi etiam dignissim diam quis. Nam libero justo laoreet sit amet. Nisl purus in mollis nunc sed id semper. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Ultricies lacus sed turpis tincidunt id aliquet risus. Condimentum lacinia quis vel eros. Sapien eget mi proin sed libero enim sed faucibus. Ac placerat vestibulum lectus mauris ultrices eros in. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Volutpat sed cras ornare arcu dui vivamus. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Leo duis ut diam quam nulla porttitor massa id. Non curabitur gravida arcu ac tortor. Enim sit amet venenatis urna cursus eget."
    )}
  />
);
