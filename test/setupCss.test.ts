import { describe, expect, it } from 'vitest'
import type { ModuleOptions } from '../src/module'
import { setupCss } from '../src/setupCss'
import { quasarAnimationsPath, quasarBrandPath, quasarCssPath, quasarFontsPath, quasarIconsPath } from '../src/constants'

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
      'quasar/dist/quasar.sass',
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
      'quasar/dist/quasar.sass',
    ])
  })

  it('should insert brand css when provided by user', async () => {
    const css = [
      '@/assets/style.css',
    ]
    const options: ModuleOptions = {
      config: {
        brand: {
          primary: 'blue',
        },
      },
    }
    const result = setupCss(css, options)
    expect(result).toEqual([
      'quasar/dist/quasar.css',
      quasarBrandPath,
      '@/assets/style.css',
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

  it('should insert flex addons after quasar css', () => {
    const css = [
      '@/assets/style.css',
      quasarCssPath,
      '@/assets/variables.css',
    ]
    const options: ModuleOptions = {
      cssAddon: true,
    }
    const result = setupCss(css, options)
    expect(result).toEqual([
      '@/assets/style.css',
      'quasar/dist/quasar.css',
      'quasar/dist/quasar.addon.css',
      '@/assets/variables.css',
    ])
  })
})
