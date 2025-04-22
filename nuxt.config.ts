// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // Optional: Add global CSS or other configurations here
  // css: ['~/assets/css/main.css'], // If you have global styles outside Tailwind
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Bricks & Minds', // Default title
      meta: [
        // Default description
        { name: 'description', content: 'Bricks & Minds – Die Boutique-Personalberatung für Fach- und Führungskräfte im Bauwesen.' }
      ],
      // Add link to favicon, etc. if needed
      // link: [
      //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // ]
    }
  },

  compatibilityDate: '2025-04-16'
})