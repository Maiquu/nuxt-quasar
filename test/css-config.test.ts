import { describe, expect, it } from 'vitest'
import type { ModuleOptions } from '../src/module'
import { setupCss } from '../src/module'
import { quasarAnimationsPath, quasarCssPath, quasarFontsPath, quasarIconsPath } from '../src/constants'

describe('Quasar CSS injection', async () => {
  it('should replace and maintain the order of the quasar default stylesheets paths when provided by the user', async () => {
    const css = [
      quasarFontsPath,
      quasarIconsPath,
      quasarAnimationsPath,
      '@/assets/style.css',
      quasarCssPath,
    ]

    const options: ModuleOptions = {
      sassVariables: 'src/assets/scss/_variables.scss',
      extras: {
        font: 'roboto-font',
        fontIcons: ['mdi-v6'],
        svgIcons: [],
        animations: [
          'bounceInLeft',
          'bounceOutRight',
        ],
      },
    }

    const result = setupCss(css, options)
    expect(result).toEqual([
      '@quasar/extras/roboto-font/roboto-font.css',
      '@quasar/extras/mdi-v6/mdi-v6.css',
      quasarAnimationsPath,
      '@/assets/style.css',
      'quasar/src/css/index.sass',
    ])
  })

  it('should insert missing quasar stylesheets paths when not provided by the user', async () => {
    const css = [
      '@/assets/style.css',
      quasarCssPath,
    ]

    const options: ModuleOptions = {
      sassVariables: 'src/assets/scss/_variables.scss',
      extras: {
        font: 'roboto-font',
        fontIcons: ['mdi-v6'],
        svgIcons: [],
        animations: [
          'bounceInLeft',
          'bounceOutRight',
        ],
      },
    }

    const result = setupCss(css, options)
    expect(result).toEqual([
      '@quasar/extras/roboto-font/roboto-font.css',
      '@quasar/extras/mdi-v6/mdi-v6.css',
      quasarAnimationsPath,
      '@/assets/style.css',
      'quasar/src/css/index.sass',
    ])
  })

  it('should insert base quasar css path when no nuxt-quasar options have been provided by the user', async () => {
    const css = [
      '@/assets/style.css',
    ]

    const options: ModuleOptions = {}

    const result = setupCss(css, options)
    expect(result).toEqual([
      'quasar/dist/quasar.css',
      '@/assets/style.css',
    ])
  })
})
