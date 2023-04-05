import { createUnplugin } from 'unplugin'
import { importJSON } from '../utils'

const QUASAR_ENTRY = 'quasar'
const QUASAR_VIRTUAL_ENTRY = `\0${QUASAR_ENTRY}`

export const virtualQuasarEntryPlugin = createUnplugin(() => {
  return {
    name: 'quasar:entry',
    enforce: 'pre',

    resolveId(id) {
      if (id === QUASAR_ENTRY)
        return QUASAR_VIRTUAL_ENTRY
    },

    loadInclude: id => id === QUASAR_VIRTUAL_ENTRY,

    async load() {
      const entry = await createVirtualEntry()
      return entry
    },
  }
})

async function createVirtualEntry(): Promise<string> {
  const importMap = await importJSON('quasar/dist/transforms/import-map.json') as Record<string, string>

  return Object
    .entries(importMap)
    .filter(([, path]) => !path.includes('/__tests__/'))
    .map(([name, path]) => `export { default as ${name} } from "quasar/${path}"`)
    .join('\n')
}
