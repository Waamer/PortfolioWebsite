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
        'mdH': {'raw': '(max-height: 849px)'},
        'lgH': {'raw': '(min-height: 850px)'},
        'xs': {'raw': '(max-width: 420px)'},
        'xsH': {'raw': '(max-height: 620px)'},
        'xlH': {'raw': '(min-height: 1000px)'},
      }
    },
  },
  plugins: [],
};
export default config;
