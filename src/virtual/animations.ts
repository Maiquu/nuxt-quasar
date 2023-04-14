import { createUnplugin } from 'unplugin'
import { logger } from '@nuxt/kit'
import { allAnimationValues, quasarAnimationsPath } from '../constants'
import { resolveAnimation } from '../resolve'
import type { ModuleContext } from '../types'
import { readFileMemoized } from '../utils'

// Add css suffix so loaded string can be interpreted as a css file
const RESOLVED_ID = '/quasar/animations.css'
const RESOLVED_ID_WITH_QUERY_RE = /(?:[\/\\])quasar\/animations.css(\?.*)?$/

export const virtualAnimationsPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:animations',

    resolveId(id) {
      if (id.match(RESOLVED_ID_WITH_QUERY_RE))
        return id
      if (id === quasarAnimationsPath)
        return RESOLVED_ID
    },

    loadInclude: id => RESOLVED_ID_WITH_QUERY_RE.test(id),

    async load() {
      let animations = context.options.extras?.animations || []
      if (animations === 'all') {
        animations = allAnimationValues
      }

      const animationsCSS = await Promise.all(
        animations.map(async (animation) => {
          try {
            return await readFileMemoized(resolveAnimation(animation))
          } catch {
            logger.error(`Invalid quasar animation: ${animation}`)
            return ''
          }
        }),
      )

      return animationsCSS.join('\n')
    },
  }
})
