// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt"],

  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-toastification/dist/index.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  imports: {
    dirs: ["composables/*/index.{ts,js,mjs,mts}"],
  },

  routeRules: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "/": { redirect: "/character" },
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ssr: false,
});
