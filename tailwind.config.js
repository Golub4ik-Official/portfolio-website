/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#ca6e6f',
          light: '#d78c8d',
          dark: '#b55253'
        },
        background: '#0a0a0a',
        foreground: '#ededed',
        card: '#1a1a1a',
        'card-foreground': '#ededed',
        popover: '#1a1a1a',
        'popover-foreground': '#ededed',
        primary: {
          DEFAULT: '#ededed',
          foreground: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#2a2a2a',
          foreground: '#ededed',
        },
        muted: {
          DEFAULT: '#2a2a2a',
          foreground: '#a1a1aa',
        },
        border: '#2a2a2a',
        input: '#2a2a2a',
        ring: '#ca6e6f',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [],
}
