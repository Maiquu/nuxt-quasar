export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools',
  ],
  quasar: {
    plugins: [
      'AppFullscreen',
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    },
  },
})
