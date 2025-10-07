/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-gradient":
          "linear-gradient(to bottom right, #dbeafe, #bfdbfe, #93c5fd)",
        "dark-gradient":
          "linear-gradient(to bottom right, #1e293b, #0f172a, #020617)",
      },
    },
  },
  plugins: [],
};
