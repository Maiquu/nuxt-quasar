import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'
import type { ModuleContext } from '../../types'

interface VueQuery {
  vue?: boolean
  src?: string
  type?: 'script' | 'template' | 'style' | 'custom'
  index?: number
  lang?: string
  raw?: boolean
  scoped?: boolean
}

const importQuasarRegex = /import\s*\{([\w,\s]+)\}\s*from\s*(['"])quasar\2;?/g

/**
 * Transforms JS code where importing from 'quasar' package
 * Example:
 *       import { QBtn } from 'quasar'
 *    -> import QBtn from 'quasar/src/components/QBtn.js'
 */
function mapQuasarImports(code: string, importMap: Record<string, string>): string {
  return code.replace(importQuasarRegex, (_, match: string) =>
    match
      .split(',')
      .map((identifier) => {
        const data = identifier.split(' as ')
        const importName = data[0].trim()

        // might be an empty entry like below
        // (notice useQuasar is followed by a comma)
        // import { QTable, useQuasar, } from 'quasar'
        if (importName === '') {
          return ''
        }
        const importAs = data[1] !== undefined ? data[1].trim() : importName
        const importPath = importMap[importName]
        if (!importPath) {
          throw new Error(`Unknown Quasar import: ${importName}`)
        }

        return `import ${importAs} from "quasar/${importPath}"`
      })
      .join('\n'),
  )
}

function parseVueRequest(id: string): {
  filename: string
  query: VueQuery
} {
  const [filename, rawQuery] = id.split('?', 2)
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as VueQuery
  if (query.vue != null) {
    query.vue = true
  }
  if (query.index != null) {
    query.index = Number(query.index)
  }
  if (query.raw != null) {
    query.raw = true
  }
  if (query.scoped != null) {
    query.scoped = true
  }
  return {
    filename,
    query,
  }
}

export const transformImportPlugin = createUnplugin((context: ModuleContext) => {
  return {
    name: 'quasar:import',

    transformInclude: createFilter(
      [// include:
        /\.vue$/,
        /\.vue\?vue/,
        /\.vue\?v=/,
        /\.((c|m)?j|t)sx?$/,
      ],
      [// exclude:
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
    ),

    transform(code, id) {
      const { query } = parseVueRequest(id)
      if (!query.vue || (query.vue && query.type === 'script')) {
        return {
          code: mapQuasarImports(code, context.imports.raw),
          map: null,
        }
      }
    },
  }
})
