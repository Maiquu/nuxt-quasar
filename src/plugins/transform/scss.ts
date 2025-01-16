import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../../types'
import { normalizePath, parseVueRequest } from '../../utils'

export function transformScssPlugin({ options }: ModuleContext): VitePlugin {
  const sassVariables = typeof options.sassVariables === 'string'
    ? normalizePath(options.sassVariables)
    : options.sassVariables

  const scssTransform = createScssTransform('scss', sassVariables)
  const sassTransform = createScssTransform('sass', sassVariables)

  return {
    name: 'quasar:scss',
    enforce: 'pre',

    transform(src, id) {
      const { filename, query } = parseVueRequest(id)
      let code: string | undefined

      if (query.vue && query.type === 'style') {
        const lang = Object.keys(query).find(k => k.startsWith('lang.'))

        if (lang?.endsWith('.scss')) {
          code = scssTransform(src)
        }
        else if (lang?.endsWith('.sass')) {
          code = sassTransform(src)
        }
      }

      if (!query.vue) {
        if (filename.endsWith('.scss')) {
          code = scssTransform(src)
        }
        else if (filename.endsWith('.sass')) {
          code = sassTransform(src)
        }
      }

      if (code) {
        return { code, map: null }
      }
    },
  }
}

function createScssTransform(fileExtension: string, sassVariables?: string | boolean): (code: string) => string {
  const sassImportCode = ['@import \'quasar/src/css/variables.sass\'', '']

  if (typeof sassVariables === 'string') {
    sassImportCode.unshift(`@import '${sassVariables}'`)
  }

  const prefix = fileExtension === 'sass'
    ? sassImportCode.join('\n')
    : sassImportCode.join(';\n')

  return (content) => {
    const useIndex = Math.max(
      content.lastIndexOf('@use '),
      content.lastIndexOf('@forward '),
    )

    if (useIndex === -1) {
      return prefix + content
    }

    const newLineIndex = content.indexOf('\n', useIndex)

    if (newLineIndex !== -1) {
      const index = newLineIndex + 1
      return content.substring(0, index) + prefix + content.substring(index)
    }

    return `${content}\n${prefix}`
  }
}
