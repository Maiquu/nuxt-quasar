import { createUnplugin } from 'unplugin'
import { logger } from '@nuxt/kit'
import { allAnimationValues, quasarAnimationsPath } from '../constants'
import { resolveAnimation } from '../resolve'
import type { ModuleContext } from '../types'
import { readFileMemoized } from '../utils'

// Add css suffix so loaded string can be interpreted as a css file
const QUASAR_VIRTUAL_ANIMATIONS = `virtual:${quasarAnimationsPath}.css`

export const virtualAnimationsPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:animations',

    resolveId(id) {
      if (id === quasarAnimationsPath)
        return QUASAR_VIRTUAL_ANIMATIONS
    },

    loadInclude: id => id === QUASAR_VIRTUAL_ANIMATIONS,

    async load() {
      let animations = context.options.extras?.animations || []
      if (animations === 'all') {
        animations = allAnimationValues
      }

      const animationsCSS = await Promise.all(
        animations.map(async (animation) => {
          try {
            return await readFileMemoized(resolveAnimation(animation))
          }
          catch {
            logger.error(`Invalid quasar animation: ${animation}`)
            return ''
          }
        }),
      )

      return animationsCSS.join('\n')
    },
  }
})