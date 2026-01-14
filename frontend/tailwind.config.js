/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This allows you to use className="font-sans" for Jost
        sans: ['Jost', 'sans-serif'],
        // This allows you to use className="font-heading" for Poppins
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Let's define a wedding primary color (Standard Pink/Red for Indian weddings)
        primary: {
          DEFAULT: '#e72e77', // Adjust this hex code to your exact brand color
          50: '#FCE4EC',
          100: '#F8BBD0',
          500: '#E91E63',
          600: '#D81B60',
        }
      }
    },
  },
  plugins: [],
}