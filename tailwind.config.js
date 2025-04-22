/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-blue': '#1D3557',
        'brand-orange': '#F76C2F',
        'brand-green': '#2D936C',
        'brand-gray-light': '#F4F4F4',
        'brand-gray-medium': '#A8A8A8',
      }
    },
  },
  plugins: [],
}
