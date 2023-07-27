import { defineNuxtPlugin } from '#imports'
import { useQuasar } from 'quasar'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      q: useQuasar(),
    },
  }
})
