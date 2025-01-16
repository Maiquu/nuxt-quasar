import type { Plugin as VitePlugin } from 'vite'
import { quasarBrandPath } from '../../constants'
import type { ModuleContext } from '../../types'

// Add css suffix so loaded string can be interpreted as a css file
const RESOLVED_ID = '/__quasar/brand.css'
const RESOLVED_ID_WITH_QUERY_RE = /([/\\])__quasar\1brand\.css(\?.*)?$/

export function virtualBrandPlugin(context: ModuleContext): VitePlugin {
  return {
    name: 'quasar:brand',

    resolveId(id) {
      if (id.match(RESOLVED_ID_WITH_QUERY_RE))
        return id

      const [path] = id.split('?')
      if (path === quasarBrandPath)
        return RESOLVED_ID
    },

    load(id) {
      if (RESOLVED_ID_WITH_QUERY_RE.test(id))
        return [
          ':root {',
          ...Object
            .entries(context.options.config?.brand || {})
            .map(([name, color]) => `  --q-${name}: ${color};`),
          '}',
        ].join('\n')
    },
  }
}
