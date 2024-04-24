import materialIcons from 'quasar/icon-set/svg-material-icons'
import materialIconsRound from 'quasar/icon-set/svg-material-icons-round'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools',
  ],
  ssr: true,
  quasar: {
    plugins: [
      'AppFullscreen',
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
    ],
    sassVariables: true,
    iconSet: {
      ...materialIcons,
      colorPicker: materialIconsRound.colorPicker,
    },
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
      animations: 'all',
    },
    config: {
      dark: true,
    },
    components: {
      defaults: {
        QBtn: {
          color: 'primary',
        },
        QLinearProgress: {
          color: 'green',
          size: '15px',
          stripe: true,
        },
        QCircularProgress: {
          color: 'blue',
          indeterminate: true,
        },
        QSelect: {
          outlined: true,
          dense: true,
        },
        QInput: {
          outlined: true,
        },
        QToggle: {
          color: 'red',
        },
      },
    },
  },
})
