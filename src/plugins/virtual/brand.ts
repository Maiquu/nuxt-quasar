import { createUnplugin } from 'unplugin'
import { quasarBrandPath } from '../../constants'
import type { ModuleContext } from '../../types'

// Add css suffix so loaded string can be interpreted as a css file
const RESOLVED_ID = '/quasar/brand.css'
const RESOLVED_ID_WITH_QUERY_RE = /(?:[\/\\])quasar\/brand.css(\?.*)?$/

export const virtualBrandPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:brand',

    resolveId(id) {
      if (id.match(RESOLVED_ID_WITH_QUERY_RE))
        return id
      if (id === quasarBrandPath)
        return RESOLVED_ID
    },

    loadInclude: id => RESOLVED_ID_WITH_QUERY_RE.test(id),

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
