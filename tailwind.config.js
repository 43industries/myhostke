/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'logo': {
          'primary': 'var(--logo-primary)',
          'secondary': 'var(--logo-secondary)',
          'accent': 'var(--logo-accent)',
          'dark': 'var(--logo-dark)',
          'light': 'var(--logo-light)',
        },
      },
    },
  },
  plugins: [],
}

