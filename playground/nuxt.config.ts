export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '../src/module',
  ],
  quasar: {
    plugins: ['Dialog'],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    },
    sassVariables: 'assets/quasar-variables.sass',
  }
})
