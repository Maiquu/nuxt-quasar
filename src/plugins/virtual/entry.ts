import type { Plugin as VitePlugin } from 'vite'
import semver from 'semver'
import type { ModuleContext } from '../../types'

const QUASAR_ENTRY = 'quasar'
const QUASAR_VIRTUAL_ENTRY = '/__quasar/entry.mjs'

export function virtualQuasarEntryPlugin(context: ModuleContext): VitePlugin {
  const { resolveQuasar, quasarVersion } = context

  const quasarGte216 = semver.gte(quasarVersion, '2.16.0')

  // https://github.com/quasarframework/quasar/releases/tag/quasar-v2.16.0
  const clientEntry = quasarGte216
    ? resolveQuasar('dist/quasar.client.js')
    : resolveQuasar('dist/quasar.esm.js')

  const serverEntry = quasarGte216
    ? resolveQuasar('dist/quasar.server.prod.js')
    : resolveQuasar('src/index.ssr.js')

  return {
    name: 'quasar:entry',
    enforce: 'pre',

    config(config) {
      config.ssr ??= {}
      config.ssr.noExternal ??= []
      if (config.ssr.noExternal !== true) {
        config.ssr.noExternal = toArray(config.ssr.noExternal)
        config.ssr.noExternal.push(/\/node_modules\/quasar\/src\//)
      }
    },

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

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}
