/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
