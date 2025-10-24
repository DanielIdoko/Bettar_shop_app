/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        white: {
          DEFAULT: "#ffffff",
          100: "#fafafa",
          200: "#FE8C00",
        },
        gray: {
          100: "#878787",
          200: "#878787",
        },
        dark: {
          100: "#181C2E",
        },
        error: "#EF4444",
        success: "#2F9B65",
      },
      fontFamily: {
        poppins: {
          regular: "Poppins_400Regular",
          medium: "Poppins_500Medium",
          semibold: "Poppins_600SemiBold",
          bold: "Poppins_700Bold",
        },
      },
    },
  },
  plugins: [],
};
