// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  css: [
    'vue-toastification/dist/index.css',
  ],
  imports: {
    dirs: [
      'composables/*/index.{ts,js,mjs,mts}',
    ],
  },
  routeRules: {
    '/': { redirect: '/character' },
  },
  ssr: false,
})
