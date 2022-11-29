import toast from 'vue-toastification'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(toast)
})
