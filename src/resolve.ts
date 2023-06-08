import type { QuasarAnimations, QuasarFonts } from 'quasar'
import type { QuasarFontIconSet } from './types'

export function resolveAnimation(animation: QuasarAnimations): string {
  return `@quasar/extras/animate/${animation}.css`
}

export function resolveFontIcon(icon: QuasarFontIconSet): string {
  return `@quasar/extras/${icon}/${icon}.css`
}

export function resolveFont(font: QuasarFonts): string {
  return `@quasar/extras/${font}/${font}.css`
}
