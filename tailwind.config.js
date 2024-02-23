/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-brown': '#3B3406',
        'custom-light-brown': '#977757',
        'custom-light-green': '#B6E972',
        'custom-dark-green': '#063B39',
        'custom-cream': '#E2D7D5',
      }
    }
  },
  plugins: [],
}

