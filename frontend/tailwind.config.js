/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          navy: '#0f2c59',      // Deep navy primary
          maroon: '#780016',    // Rich academic maroon/crimson accent
          gold: '#d4af37',      // Warm gold/amber accent
          sand: '#fcf8f2',      // Neutral light body bg
          slate: '#1e293b',     // Dark slate text
          lightSlate: '#64748b' // Muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Outfit', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
