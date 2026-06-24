import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        charcoal: "#242321",
        cream: "#fbf7ef",
        linen: "#efe7d8",
        gold: "#c5a45d",
        sage: "#667a68",
        teal: "#2f8f83"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(21, 21, 21, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
