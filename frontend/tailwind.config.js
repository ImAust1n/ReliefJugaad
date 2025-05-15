/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emergency-black': '#000F0B',
        'emergency-forest': '#054938',
        'emergency-surface': '#0A2E25',
        'emergency-basil': '#1A6356',
        'emergency-green': '#2A8E7B',
        'emergency-meadow': '#3DAE99',
        'emergency-mint': '#5ECFB9',
        'emergency-caribbean': '#7EEFD9',
        'emergency-white': '#FFFFFF',
      },
      animation: {
        'pulse-alert': 'pulseAlert 2s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        pulseAlert: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
