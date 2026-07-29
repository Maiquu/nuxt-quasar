import { JSDOM } from 'jsdom'
import { $fetch } from '@nuxt/test-utils/e2e'
import { biApp } from '@quasar/extras/bootstrap-icons'

export { biApp }

export async function fetchDocument(path = '/'): Promise<Document> {
  const html = await $fetch(path) as string
  return new JSDOM(html).window.document
}

/** Returns CSS contents of the first injected stylesheet containing `text`, else undefined. */
export async function findStylesheetContaining(text: string): Promise<string | undefined> {
  const document = await fetchDocument()
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]')
  for (const link of links) {
    const css = await $fetch(link.href) as string
    if (css.includes(text)) return css
  }
  return undefined
}

/** Gets the `d` attribute of the first `<path>` inside the first `<svg>` in the SSR'd document. */
export async function firstRenderedPathD(): Promise<string | undefined> {
  const document = await fetchDocument()
  return document.querySelector('svg path')?.getAttribute('d') ?? undefined
}

/** Get first `d` path from a Quasar icon definition string. */
export function firstIconPathD(icon: string): string | undefined {
  const [iconDef] = icon.split('|')
  const firstPath = iconDef!.split('&&')[0]!
  const firstPathD = firstPath.split('@@')[0]
  return firstPathD
}
