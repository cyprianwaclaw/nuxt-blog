// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        // Dodaj link do arkusza stylów GrapesJS
        { rel: 'stylesheet', href: 'https://unpkg.com/grapesjs/dist/css/grapes.min.css' },
      ],
      script: [
        { src: 'https://unpkg.com/grapesjs' }
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-swiper'],
  css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss'],
})