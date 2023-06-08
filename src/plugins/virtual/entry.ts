import { createUnplugin } from 'unplugin'
import type { ModuleContext } from '../../types'

const QUASAR_ENTRY = 'quasar'
const QUASAR_VIRTUAL_ENTRY = '/__quasar/entry.mjs'

export const virtualQuasarEntryPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:entry',
    enforce: 'pre',

    resolveId(id) {
      if (id === QUASAR_ENTRY)
        return QUASAR_VIRTUAL_ENTRY
    },

    loadInclude: id => id === QUASAR_VIRTUAL_ENTRY,

    async load() {
      return Object
        .entries(context.imports.raw)
        .filter(([, path]) => !path.includes('/__tests__/'))
        .map(([name, path]) => `export { default as ${name} } from "quasar/${path}"`)
        .join('\n')
    },
  }
})
