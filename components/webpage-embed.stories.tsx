import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { WebpageEmbed, WebpageEmbedProps } from "./webpage-embed";

export default {
  title: "Components/WebpageEmbed",
  component: WebpageEmbed,
  argTypes: {
    className: { control: false },
  },
  args: {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl purus in mollis nunc sed.",
    description:
      "Purus non enim praesent elementum facilisis leo vel. Risus ultricies tristique nulla aliquet enim tortor at auctor. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Nisl condimentum id venenatis a. Pulvinar pellentesque habitant morbi tristique senectus. Posuere morbi leo urna molestie at elementum. Convallis posuere morbi leo urna molestie at elementum eu. Ultrices gravida dictum fusce ut placerat orci. Suscipit tellus mauris a diam. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Quis ipsum suspendisse ultrices gravida dictum.",
    href: "https://dummy.kohei.dev/?canonical=unknown",
    imageSrc: "https://picsum.photos/256",
  },
} as Meta;

export const Example: Story<WebpageEmbedProps> = (props) => (
  <WebpageEmbed {...props} />
);
