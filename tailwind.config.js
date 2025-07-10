/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins_400Regular', 'sans-serif'],
        poppinsBold: ['Poppins_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
