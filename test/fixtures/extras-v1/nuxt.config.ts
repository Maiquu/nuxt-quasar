import QuasarModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    QuasarModule,
  ],
  imports: {
    autoImport: true,
  },
  quasar: {
    extras: {
      animations: 'all',
      svgIcons: ['bootstrap-icons'],
      fontIcons: ['eva-icons'],
    },
  },
})
