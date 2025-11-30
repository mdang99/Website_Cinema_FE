/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/features/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e50914",
        dark: "#0b0b0f",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1200px",
        },
      },
    },
  },
  plugins: [],
};
