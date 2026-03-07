/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37", // Gold
        "background-light": "#FDF2F2",
        "background-dark": "#120505",
        maroon: {
          50: "#fff1f1",
          100: "#ffdfdf",
          200: "#ffc5c5",
          300: "#f99c9c",
          400: "#f16464",
          500: "#e03e3e",
          600: "#cc2a2a",
          700: "#ab2121",
          800: "#8d1e1e",
          900: "#761e1e",
          950: "#400b0b",
        }
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1.25rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
