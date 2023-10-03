import type { Plugin as VitePlugin } from 'vite'
import { quasarAnimationsPath } from '../../constants'
import type { ModuleContext } from '../../types'
import { uniq } from '../../utils'

// Add css suffix so loaded string can be interpreted as a css file
const RESOLVED_ID = '/__quasar/animations.css'
const RESOLVED_ID_WITH_QUERY_RE = /([\/\\])__quasar\1animations\.css(\?.*)?$/

export function virtualAnimationsPlugin({ options, resolveQuasarExtras }: ModuleContext): VitePlugin {
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
        const { generalAnimations, inAnimations, outAnimations } = await import('@quasar/extras/animate/animate-list.mjs')
        animations = [...generalAnimations, ...inAnimations, ...outAnimations]
      } else {
        animations = uniq(animations)
      }

      return animations
        .map(animation => `@import '${resolveQuasarExtras(`animate/${animation}.css`)}';`)
        .join('\n')
    },
  }
}
