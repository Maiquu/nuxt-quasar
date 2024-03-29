import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../../types'

const QUASAR_ENTRY = 'quasar'
const QUASAR_VIRTUAL_ENTRY = '/__quasar/entry.mjs'

export function virtualQuasarEntryPlugin(context: ModuleContext): VitePlugin {
  return {
    name: 'quasar:entry',
    enforce: 'pre',

    resolveId(id) {
      if (id === QUASAR_ENTRY) {
        return {
          id: QUASAR_VIRTUAL_ENTRY,
          moduleSideEffects: false,
        }
      }
    },

    async load(id) {
      if (id === QUASAR_VIRTUAL_ENTRY)
        return Object
          .entries(context.imports.raw)
          .filter(([, path]) => !path.includes('/__tests__/'))
          .map(([name, path]) => `export { default as ${name} } from "quasar/${path}"`)
          .join('\n')
    },
  }
}
