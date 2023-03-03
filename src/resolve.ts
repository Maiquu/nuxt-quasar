import { QuasarAnimations, QuasarFonts } from "quasar"
import { QuasarFontIconSets } from "./types"

export function resolveAnimation(animation: QuasarAnimations): string {
  return `@quasar/extras/animate/${animation}.css`
}

export function resolveFontIcon(icon: QuasarFontIconSets): string {
  return `@quasar/extras/${icon}/${icon}.css`
}

export function resolveFont(font: QuasarFonts): string {
  return `@quasar/extras/${font}/${font}.css`
}
