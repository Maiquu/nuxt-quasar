import type { Plugin as VitePlugin } from 'vite'
import semver from 'semver'
import type { ModuleContext } from '../../types'

const QUASAR_ENTRY = 'quasar'
const QUASAR_VIRTUAL_ENTRY = '/__quasar/entry.mjs'

export function virtualQuasarEntryPlugin(context: ModuleContext): VitePlugin {
  const { resolveQuasar, quasarVersion } = context

  // https://github.com/quasarframework/quasar/releases/tag/quasar-v2.16.0
  const clientEntry = semver.gte(quasarVersion, '2.16.0')
    ? resolveQuasar('dist/quasar.client.js')
    : resolveQuasar('dist/quasar.esm.js')

  const serverEntry = resolveQuasar('src/index.ssr.js')

  return {
    name: 'quasar:entry',
    enforce: 'pre',

    resolveId(id) {
      if (id === QUASAR_ENTRY) {
        return {
          id: context.dev
            ? context.mode === 'client'
              ? clientEntry
              : serverEntry
            : QUASAR_VIRTUAL_ENTRY,
          moduleSideEffects: false,
        }
      }
    },

    async load(id) {
      if (!context.dev && id === QUASAR_VIRTUAL_ENTRY)
        return Object
          .entries(context.imports.raw)
          .filter(([, path]) => !path.includes('/__tests__/'))
          .map(([name, path]) => `export { default as ${name} } from "quasar/${path}"`)
          .join('\n')
    },
  }
}
