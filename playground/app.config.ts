import { defineAppConfig } from '#imports'

export default defineAppConfig({
  // UI Configuration in `app.config` will override `nuxt.config`
  nuxtQuasarCustom: {
    brand: {
      primary: 'purple',
    },
  },
})
