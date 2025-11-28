import MagicString from 'magic-string'
import { useNuxt } from '@nuxt/kit'
import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../../types'

const directivesRegExp = /(?<=[ (])_?resolveDirective\(\s*["']([^'"]*)["'][^)]*\)/g

export function transformDirectivesPlugin(context: ModuleContext): VitePlugin {
  const { sourcemap } = useNuxt().options
  return {
    name: 'quasar:directive',
    enforce: 'post',

    transform(code, id) {
      const [filename] = id.split('?', 2)

      if (!filename || !filename.endsWith('.vue'))
        return null

      const s = new MagicString(code)
      const directives: {
        name: string
        alias: string
      }[] = []

      let counter = 0

      s.replace(directivesRegExp, (full, name) => {
        const directive = context.imports.directives.find(d => d.kebabCase === name)
        if (directive) {
          const alias = `__q_directive_${counter++}`
          directives.push({
            name: directive.name,
            alias,
          })
          return alias
        }
        else {
          return full
        }
      })

      if (directives.length) {
        s.prepend(
          `${directives
            .map(d => `import { ${d.name} as ${d.alias} } from "quasar"`)
            .join('\n')}\n`,
        )
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: sourcemap[context.mode]
            ? s.generateMap({ source: id, includeContent: true })
            : undefined,
        }
      }
    },
  }
}
