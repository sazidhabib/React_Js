/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            maxWidth: "none",
            a: {
              color: theme("colors.blue.600"),
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.blue.800"),
              },
            },
            "ol > li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.600"),
            },
            "ul > li::marker": {
              color: theme("colors.gray.500"),
            },
            strong: {
              fontWeight: "600",
              color: theme("colors.gray.800"),
            },
            h1: {
              fontSize: theme("fontSize.2xl"),
              fontWeight: "700",
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontSize: theme("fontSize.xl"),
              fontWeight: "600",
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.4"),
            },
            h3: {
              fontSize: theme("fontSize.lg"),
              fontWeight: "600",
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.3"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
