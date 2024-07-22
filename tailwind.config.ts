import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'smH': {'raw': '(max-height: 750px)'},
        'mdH': {'raw': '(min-height: 850px)'},
      }
    },
  },
  plugins: [],
};
export default config;
