import type { QuasarGeneralAnimations, QuasarInAnimations, QuasarOutAnimations } from 'quasar'
import { readFile } from 'node:fs/promises'
import type { Plugin as VitePlugin } from 'vite'
import { quasarAnimationsPath } from '../../constants'
import type { ModuleContext } from '../../types'
import { uniq } from '../../utils'

// Add css suffix so loaded string can be interpreted as a css file
const RESOLVED_ID = '\0/__quasar/animations.css'
const RESOLVED_ID_WITH_QUERY_RE = /([/\\])__quasar\1animations\.css(\?.*)?$/

interface AnimationsModule {
  generalAnimations: QuasarGeneralAnimations[]
  inAnimations: QuasarInAnimations[]
  outAnimations: QuasarOutAnimations[]
}

export function virtualAnimationsPlugin({ options, resolveQuasarExtras, quasarExtrasGte2 }: ModuleContext): VitePlugin {
  return {
    name: 'quasar:animations',

    resolveId(id) {
      if (id.match(RESOLVED_ID_WITH_QUERY_RE))
        return id

      const [path] = id.split('?')
      if (path === quasarAnimationsPath)
        return RESOLVED_ID
    },

    async load(id) {
      if (!RESOLVED_ID_WITH_QUERY_RE.test(id))
        return

      let animations = options.extras?.animations || []
      if (animations === 'all') {
        const { generalAnimations, inAnimations, outAnimations } = (quasarExtrasGte2
          ? await import('@quasar/extras/animate/animate-list.common')
          // @ts-expect-error No `.mjs` in `@quasar/extras@>=2`
          : await import('@quasar/extras/animate/animate-list.mjs')) as AnimationsModule
        animations = [...generalAnimations, ...inAnimations, ...outAnimations]
      }
      else {
        animations = uniq(animations)
      }

      const cssArray = await Promise.all(
        animations.map(animation =>
          readFile(resolveQuasarExtras(`animate/${animation}.css`), 'utf8'),
        ),
      )
      return cssArray.join('\n')
    },
  }
}
