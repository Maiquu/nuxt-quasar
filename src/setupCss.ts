import type { QuasarFonts } from 'quasar'
import { logger } from '@nuxt/kit'
import { quasarAnimationsPath, quasarBrandPath, quasarCssPath, quasarFontsPath, quasarIconsPath } from './constants'
import type { ModuleOptions } from './module'
import type { QuasarFontIconSet } from './types'
import { uniq } from './utils'

/**
 * Inject the Quasar css into the nuxt.options.css array.
 * It takes into account the order of the css array when the user has specified it.
 * Example:
 *  css: [
 *   'quasar/fonts',
 *   'quasar/animations',
 *   'quasar/icons',
 *   '@/assets/style.css',
 *   'quasar/css',
 * ]
 * @param css
 * @param options
 */
export function setupCss(css: string[], options: ModuleOptions) {
  // TODO: Deprecate writing `quasar/brand` to css array
  const brand = options.config?.brand || {}
  if (!css.includes(quasarBrandPath) && Object.keys(brand).length) {
    css.unshift(quasarBrandPath)
  }
  if (css.includes(quasarBrandPath)) {
    logger.warn('Re-ordering "quasar/brand" is deprecated. In a future version, brand variables will always be defined in body tag.')
  }

  const quasarCss = [
    typeof options.sassVariables === 'string'
      ? 'quasar/dist/quasar.sass'
      : 'quasar/dist/quasar.css',
  ]
  if (options.cssAddon) {
    quasarCss.push('quasar/dist/quasar.addon.css')
  }

  const index = css.indexOf(quasarCssPath)
  if (index !== -1) {
    css.splice(index, 1, ...quasarCss)
  } else {
    css.unshift(...quasarCss)
  }

  const animations = options.extras?.animations || []
  if (!css.includes(quasarAnimationsPath) && animations.length) {
    css.unshift(quasarAnimationsPath)
  }

  if (options.extras?.fontIcons) {
    const i = css.indexOf(quasarIconsPath)
    if (i !== -1) {
      css.splice(i, 1, ...uniq(options.extras.fontIcons).map(resolveFontIcon))
    } else {
      css.unshift(...uniq(options.extras.fontIcons).map(resolveFontIcon))
    }
  }

  if (options.extras?.font) {
    const i = css.indexOf(quasarFontsPath)
    if (i !== -1) {
      css.splice(i, 1, resolveFont(options.extras.font))
    } else {
      css.unshift(resolveFont(options.extras.font))
    }
  }

  return css
}

function resolveFontIcon(icon: QuasarFontIconSet): string {
  return `@quasar/extras/${icon}/${icon}.css`
}

function resolveFont(font: QuasarFonts): string {
  return `@quasar/extras/${font}/${font}.css`
}
