import type { Plugin as VitePlugin } from 'vite'

const QUASAR_PURE_RE = /([\\\/])node_modules\1quasar\1src\1(components|composables|directives)\1/

export function resolveQuasarModuleSideEffectsPlugin(): VitePlugin {
  return {
    name: 'quasar:resolve-side-effects',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!QUASAR_PURE_RE.test(source))
        return

      const resolution = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      })

      if (resolution) {
        resolution.moduleSideEffects = false
      }
      return resolution
    },
  }
}
