/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#070B14',
        'brand-bg2': '#0A0F1E',
        'brand-surface': '#0F1A2E',
        'brand-surface2': '#13213A',
        'brand-border': '#26324E',
        'brand-border2': '#33425F',
        'brand-blue': '#4B7FFF',
        'brand-blue-soft': '#6E9BFF',
        'brand-blue-deep': '#2B4EAE',
        'brand-gold': '#FFB946',
        'brand-gold-deep': '#D9821A',
        'brand-green': '#22C55E',
        'brand-green-soft': '#34D399',
        'brand-amber': '#F5A524',
        'brand-red': '#FF5C6C',
        'brand-wpp': '#25D366',
        'brand-text': '#EAF0FA',
        'brand-muted': '#8A98B5',
        'brand-muted2': '#5E6C88',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'brand': '18px',
      },
      maxWidth: {
        'brand': '760px',
      },
      boxShadow: {
        'brand': '0 18px 50px -12px rgba(0,0,0,.7)',
      }
    }
  }
}
