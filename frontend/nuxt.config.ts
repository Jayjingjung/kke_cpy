export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiBaseInternal: process.env.NUXT_API_BASE_INTERNAL || 'http://backend:4000',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
    },
  },

  i18n: {
    locales: [
      { code: 'lo', name: 'ລາວ', file: 'lo.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
    ],
    defaultLocale: 'lo',
    langDir: '../locales/',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
    },
  },

  app: {
    head: {
      title: 'KHOUNKHAM ENERGY SOLE CO., LTD',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'KHOUNKHAM ENERGY - Mining, Plywood, Gas Stations, Electrical Engineering, Logistics' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Phetsarath:wght@400;700&family=Noto+Sans+Lao:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap' },
      ],
    },
  },

  compatibilityDate: '2024-10-01',
});
