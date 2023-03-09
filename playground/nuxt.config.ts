export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '../src/module',
  ],
  quasar: {
    plugins: [
      'AppFullscreen',
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    },
  }
})
