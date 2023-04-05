import { createUnplugin } from 'unplugin'
import { quasarBrandPath } from '../constants'
import type { ModuleContext } from '../types'

// Add css suffix so loaded string can be interpreted as a css file
const QUASAR_VIRTUAL_BRAND = `\0virtual:${quasarBrandPath}.css`

export const virtualBrandPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:brand',

    resolveId(id) {
      if (id === quasarBrandPath)
        return QUASAR_VIRTUAL_BRAND
    },

    loadInclude: id => id === QUASAR_VIRTUAL_BRAND,

    load() {
      return [
        ':root {',
        ...Object
          .entries(context.options.config?.brand || {})
          .map(([name, color]) => `  --q-${name}: ${color};`),
        '}',
      ].join('\n')
    },
  }
})
