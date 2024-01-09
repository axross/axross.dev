import containerQueryPlugin from "@tailwindcss/container-queries";
import typographyPlugin from "@tailwindcss/typography";
import { type Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/globals.css",
    "./.storybook/preview.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [typographyPlugin, containerQueryPlugin],
};

export default config;
