import { useQuasar } from 'quasar'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      q: useQuasar(),
    },
  }
})
