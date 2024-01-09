import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview, Renderer } from "@storybook/react";
// import { ToastProvider, ToastViewport } from "~/components/toast";
import "../src/app/globals.css";

globalThis.document.body.classList.add(
  "min-w-[375px]",
  "min-h-screen",
  "bg-white",
  "dark:bg-black",
  "text-zinc-700",
  "dark:text-zinc-300"
);

// globalThis.document
//   .getElementById("storybook-root")
//   .classList.add("@container", "w-full");

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
    // (Story) => (
    //   <ToastProvider>
    //     {Story()}

    //     <ToastViewport />
    //   </ToastProvider>
    // ),
    withThemeByDataAttribute<Renderer>({
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
        boolean: /^asChild$/,
        color: /(background|color)$/i,
        date: /[a-z]At$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
