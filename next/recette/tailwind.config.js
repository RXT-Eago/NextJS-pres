/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#46DBC4',
        secondary: '#1E1E1E',
        primaryText: '#E0E0E0',
        backrgound: '#121212',
      },
      keyframes: {
        swipeIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        swipeIn: 'swipeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}