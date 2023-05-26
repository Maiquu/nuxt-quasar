import { defineNuxtPlugin } from 'nuxt/app'
import { useQuasar } from 'quasar'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      q: useQuasar(),
    },
  }
})
