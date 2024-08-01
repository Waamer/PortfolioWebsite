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
        'xs': {'raw': '(max-width: 420px)'},
        'xsH': {'raw': '(max-height: 620px)'},
      }
    },
  },
  plugins: [],
};
export default config;
