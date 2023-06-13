import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../../types'
import { normalizePath } from '../../utils'

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
      const [filename] = id.split('?', 2)

      if (filename.endsWith('.scss')) {
        return {
          code: scssTransform(src),
          map: null,
        }
      }

      if (filename.endsWith('.sass')) {
        return {
          code: sassTransform(src),
          map: null,
        }
      }

      return null
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
