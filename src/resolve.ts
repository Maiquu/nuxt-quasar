import type { QuasarFonts } from 'quasar'
import type { QuasarFontIconSet } from './types'

export function resolveFontIcon(icon: QuasarFontIconSet): string {
  return `@quasar/extras/${icon}/${icon}.css`
}

export function resolveFont(font: QuasarFonts): string {
  return `@quasar/extras/${font}/${font}.css`
}
