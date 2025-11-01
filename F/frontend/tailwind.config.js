/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#2B2E83',     // Couleur logo et texte principal
        buttonBlue: '#3B46F1',      // Boutons vifs
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Police globale
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
