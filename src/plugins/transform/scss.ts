import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../../types'
import { normalizePath, parseVueRequest } from '../../utils'

export function transformScssPlugin({ options }: ModuleContext): VitePlugin {
  const sassVariables
    = typeof options.sassVariables === 'string' ? normalizePath(options.sassVariables) : options.sassVariables

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
  return (content) => {
    // Check if content already imports Quasar variables to avoid conflicts
    const hasQuasarVariables
      = content.includes('quasar/src/css/variables')
        || content.includes('quasar/dist/')
        || (content.includes('@use') && content.includes('quasar'))

    // Strategy to avoid namespace conflicts:
    // 1. If content already has Quasar-related imports, don't add more
    // 2. If custom variables are provided, use only those (they should include/forward Quasar vars)
    // 3. If no custom variables and no existing imports, use Quasar's default variables
    // 4. Use "as *" for backward compatibility with existing code
    const sassUseStatements: string[] = []

    if (hasQuasarVariables) {
      // Content already imports Quasar variables, don't add duplicates
      return content
    }
    else if (typeof sassVariables === 'string') {
      // Custom variables file - assume it properly handles Quasar variables
      sassUseStatements.push(`@use '${sassVariables}' as *`)
    }
    else {
      // No custom variables and no existing imports - use Quasar's default variables
      sassUseStatements.push('@use \'quasar/src/css/variables.sass\' as *')
    }

    sassUseStatements.push('') // Add empty line for formatting

    const prefix = fileExtension === 'sass' ? sassUseStatements.join('\n') : sassUseStatements.join(';\n')

    // Find the last @use or @forward statement to maintain proper order
    const useIndex = Math.max(content.lastIndexOf('@use '), content.lastIndexOf('@forward '))

    if (useIndex === -1) {
      // No existing @use/@forward statements, add our @use statements at the beginning
      return prefix + content
    }

    // Find the end of the last @use/@forward statement
    const newLineIndex = content.indexOf('\n', useIndex)

    if (newLineIndex !== -1) {
      const index = newLineIndex + 1
      return content.substring(0, index) + prefix + content.substring(index)
    }

    return `${content}\n${prefix}`
  }
}
