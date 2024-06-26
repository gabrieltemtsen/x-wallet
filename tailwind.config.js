/** @type {import('tailwindcss').Config} */
const konstaConfig = require('konsta/config');
module.exports =  konstaConfig({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      material: 'Space Grotesk',
    },
    extend: {
      
    },
  },
  plugins: [],
});
