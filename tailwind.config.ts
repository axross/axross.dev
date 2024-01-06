import typographyPlugin from "@tailwindcss/typography";
import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [typographyPlugin],
};

export default config;
