// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  runtimeConfig: {
    public: {
      siteUrl: 'https://binarion.de',
      siteName: 'Binarion',
      defaultOgImage: '/img/Logo.png'
    }
  },

  // Optional: Add global CSS or other configurations here
  // css: ['~/assets/css/main.css'], // If you have global styles outside Tailwind
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'de'
      },
      titleTemplate: '%s | Binarion',
      title: 'Binarion', // Default title
      meta: [
        // Default description
        { name: 'description', content: 'Binarion ist die 1 im digitalen Recruiting: IT-Recruiting, Tech-Talente und schnelle, präzise Vermittlung für Unternehmen und Kandidaten.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { property: 'og:site_name', content: 'Binarion' },
        { property: 'og:locale', content: 'de_DE' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      // Add link to favicon, etc. if needed
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/sm.png' },
        { rel: 'apple-touch-icon', href: '/favicon/sm.png' }
      ]
    }
  },

  site: {
    url: 'https://binarion.de',
    name: 'Binarion'
  },

  robots: {
    credits: false,
    sitemap: 'https://binarion.de/sitemap.xml'
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/feedback/**', '/talente-finden-backup'],
    urls: [
      '/',
      '/about',
      '/contact',
      '/jobs',
      '/kandidaten',
      '/partner',
      '/talente-finden',
      '/impressum',
      '/datenschutz'
    ]
  },

  routeRules: {
    '/feedback/**': { robots: false },
    '/talente-finden-backup': { robots: false }
  },

  compatibilityDate: '2025-04-16'
})