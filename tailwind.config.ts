import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New GRYT color system - White/Black/Vibrant Green
        "gryt-black": "hsl(var(--gryt-black))",
        "gryt-green": "hsl(var(--gryt-green))",
        "gryt-white": "hsl(var(--gryt-white))",
        "gryt-gray": {
          50: "hsl(var(--gryt-gray-50))",
          100: "hsl(var(--gryt-gray-100))",
          200: "hsl(var(--gryt-gray-200))",
          300: "hsl(var(--gryt-gray-300))",
          400: "hsl(var(--gryt-gray-400))",
          500: "hsl(var(--gryt-gray-500))",
          600: "hsl(var(--gryt-gray-600))",
          700: "hsl(var(--gryt-gray-700))",
          800: "hsl(var(--gryt-gray-800))",
          900: "hsl(var(--gryt-gray-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg) translateZ(0)" },
          "100%": { transform: "rotate(360deg) translateZ(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "brutal-hover": {
          "0%": { transform: "translateZ(0) translateY(0)" },
          "100%": { transform: "translateZ(0) translateY(-2px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--gryt-green))" },
          "50%": { boxShadow: "0 0 20px hsl(var(--gryt-green)), 0 0 30px hsl(var(--gryt-green))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 1s linear",
        "pulse-slow": "pulse-slow 1.5s ease-in-out",
        "brutal-hover": "brutal-hover 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
      },
      transitionTimingFunction: {
        brutal: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px hsl(var(--gryt-black))",
        "brutal-lg": "6px 6px 0px 0px hsl(var(--gryt-black))",
        "brutal-xl": "8px 8px 0px 0px hsl(var(--gryt-black))",
        "brutal-green": "4px 4px 0px 0px hsl(var(--gryt-green))",
        "brutal-green-lg": "6px 6px 0px 0px hsl(var(--gryt-green))",
        "glow-green": "0 0 20px hsl(var(--gryt-green))",
        "glow-green-lg": "0 0 30px hsl(var(--gryt-green)), 0 0 40px hsl(var(--gryt-green))",
      },
      translate: {
        "y-brutal": "-2px",
      },
      utilities: {
        ".translate-y-brutal": {
          transform: "translateZ(0) translateY(-2px)",
        },
        ".hover\\:translate-y-brutal:hover": {
          transform: "translateZ(0) translateY(-2px)",
        },
        ".active\\:translate-y-0:active": {
          transform: "translateZ(0) translateY(0)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
