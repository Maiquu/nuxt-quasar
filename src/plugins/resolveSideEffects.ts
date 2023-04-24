import type { Plugin as VitePlugin } from 'vite'

const QUASAR_PURE_RE = /([\/\\])quasar\1src\1(components|composables|directives)\1/

export const resolveQuasarModuleSideEffectsPlugin = (): VitePlugin => {
  return {
    name: 'quasar:resolve-side-effects',
    enforce: 'pre',
    resolveId(id) {
      if (id.includes('node_modules') && QUASAR_PURE_RE.test(id)) {
        return {
          id,
          moduleSideEffects: false,
        }
      }
    },
  }
}
