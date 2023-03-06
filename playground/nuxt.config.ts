export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '../src/module',
  ],
  // ssr: false,
  quasar: {
    plugins: [],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
    },
  }
})
