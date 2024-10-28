import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light-gradient": "linear-gradient(to right, #ffffff, #c1dcff)",
        "dark-gradient": "linear-gradient(to right, #303f57, #091122)",
      },
      colors: {
        dark: {
          primary: "#303f57",
          secondary: "#091122",
          text: "#ffffff",
          background: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
