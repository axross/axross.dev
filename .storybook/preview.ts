import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { type Preview, type ReactRenderer } from "@storybook/react";
import { baseFont } from "../src/helpers/fonts";
import "../src/variables.css";
// eslint-disable-next-line import/no-unassigned-import
import "./globals.css";

globalThis.document.body.classList.add(baseFont.className);

const preview: Preview = {
  argTypes: {
    className: {
      control: "text",
    },
    style: {
      control: "object",
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      disable: true,
      grid: {
        cellSize: 16,
        opacity: 0.25,
        cellAmount: 4,
        offsetX: 8,
        offsetY: 8,
      },
    },
    controls: {
      matchers: {
        boolean: /^asChild$/u,
        date: /[A-Za-z]+At$/iu,
      },
    },
    layout: "centered",
  },
};

export default preview;
