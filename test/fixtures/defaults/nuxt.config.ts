import QuasarModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    QuasarModule,
  ],
  quasar: {
    components: {
      defaults: {
        QBtn: {
          color: 'primary',
          label: 'Default',
        },
      },
    },
  },
})
