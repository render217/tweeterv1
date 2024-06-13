/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clrClearBlue: "#2F80ED",
        clrGunSmoke: "#828282",
        clrDarkGrey: "#333333",
        clrDavyGrey: "#4F4F4F",
        clrPorcelain: "#F2F2F2",
        clrVistaWhite: "#FAFAFA",
        clrFrenchGrey: "#BDBDBD",
        clrJadeGreen: "#27AE60",
        clrValentineRed: "#EB5757",
        clrGreyChateau: "#A9A9A9",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        NotoSans: ["NotoSans", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};
