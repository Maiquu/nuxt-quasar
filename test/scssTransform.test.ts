import { describe, expect, it } from 'vitest'
import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext } from '../src/types'
import { transformScssPlugin } from '../src/plugins/transform/scss'

// Helper function to extract the transform function from the plugin
function getScssTransform(fileExtension: 'scss' | 'sass', sassVariables?: string | boolean) {
  const mockContext: ModuleContext = {
    ssr: true,
    dev: true,
    mode: 'client',
    imports: {
      components: [],
      directives: [],
      plugins: [],
    },
    options: {
      sassVariables,
      lang: 'en-US',
      iconSet: 'material-icons',
      autoIncludeIconSet: true,
      cssAddon: false,
      appConfigKey: 'nuxtQuasar',
      components: {
        defaults: {},
        autoImport: true,
      },
      plugins: [],
      extras: {},
    },
    quasarVersion: '2.0.0',
    sassVersion: '1.90.0',
    resolveLocal: (path: string) => path,
    resolveQuasar: (path: string) => path,
    resolveQuasarExtras: (path: string) => path,
  }

  const plugin = transformScssPlugin(mockContext) as VitePlugin & {
    transform: (src: string, id: string) => { code: string, map: null } | undefined
  }

  // Mock the file extension by creating appropriate mock IDs
  const mockId = fileExtension === 'scss' ? 'test.scss' : 'test.sass'

  return (content: string) => {
    const result = plugin.transform!(content, mockId)
    return result?.code || content
  }
}

describe('SCSS Transform Plugin', () => {
  describe('Namespace Conflict Resolution', () => {
    it('should NOT add imports when content already has Quasar variables', () => {
      const transform = getScssTransform('scss', false)
      const input
        = '@use "~/assets/css/quasar/qvariables.scss" as *;\n@use "quasar/src/css/variables.sass" as *;\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toBe(input) // Should return unchanged
      expect(result.split('\n').length).toBe(input.split('\n').length) // No lines added
    })

    it('should NOT add imports when content has custom variables referencing Quasar', () => {
      const transform = getScssTransform('scss', 'custom-vars.sass')
      const input = '@use "~/assets/css/quasar/qvariables.scss" as *;\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toBe(input) // Should return unchanged
      expect(result.includes('custom-vars.sass')).toBe(false) // Should not add custom import
    })

    it('should detect Quasar dist imports and avoid conflicts', () => {
      const transform = getScssTransform('scss', false)
      const input = '@use "quasar/dist/quasar.sass" as *;\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toBe(input) // Should return unchanged
      expect(result.includes('quasar/src/css/variables')).toBe(false) // Should not add default import
    })

    it('should detect generic @use with quasar and avoid conflicts', () => {
      const transform = getScssTransform('scss', false)
      const input = '@use "quasar" as q;\n\n.button {\n  color: q.$primary;\n}'

      const result = transform(input)

      expect(result).toBe(input) // Should return unchanged
    })
  })

  describe('Clean Content Scenarios', () => {
    it('should add ONLY custom variables import for clean content', () => {
      const transform = getScssTransform('scss', 'custom-vars.sass')
      const input = '.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toContain('@use \'custom-vars.sass\' as *')
      expect(result).not.toContain('quasar/src/css/variables')
      expect(result).toContain(input) // Original content preserved
    })

    it('should add ONLY Quasar variables import for clean content', () => {
      const transform = getScssTransform('scss', false)
      const input = '.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *')
      expect(result).toContain(input) // Original content preserved
    })

    it('should add Quasar variables after existing @use statements', () => {
      const transform = getScssTransform('scss', false)
      const input = '@use "./utils" as *;\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toContain('@use "./utils" as *')
      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *')
      expect(result.indexOf('@use "./utils"')).toBeLessThan(result.indexOf('@use \'quasar/src/css/variables'))
    })
  })

  describe('File Extension Support', () => {
    it('should handle SCSS files with semicolon separators', () => {
      const transform = getScssTransform('scss', false)
      const input = '.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *;')
    })

    it('should handle Sass files with newline separators', () => {
      const transform = getScssTransform('sass', false)
      const input = '.button\n  color: $primary'

      const result = transform(input)

      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *\n')
      expect(result).not.toContain(';')
    })
  })

  describe('Import Order and Formatting', () => {
    it('should maintain proper @use statement order', () => {
      const transform = getScssTransform('scss', false)
      const input = '@use "./base" as *;\n@use "./mixins" as *;\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      const lines = result.split('\n')
      const mixinsIndex = lines.findIndex(line => line.includes('./mixins'))
      const quasarIndex = lines.findIndex(line => line.includes('quasar/src/css/variables'))

      expect(quasarIndex).toBeGreaterThan(mixinsIndex)
    })

    it('should add imports with proper formatting', () => {
      const transform = getScssTransform('scss', false)
      const input = '.button {\n  color: $primary;\n}'

      const result = transform(input)

      // Check that the @use statement is added properly
      expect(result).toMatch(/@use.*;\n\.button/)
      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *;')
      expect(result).toContain(input)
    })
  })

  describe('Edge Cases', () => {
    it('should handle content with @forward statements', () => {
      const transform = getScssTransform('scss', false)
      const input = '@forward "./base";\n\n.button {\n  color: $primary;\n}'

      const result = transform(input)

      expect(result).toContain('@forward "./base"')
      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *')

      const forwardIndex = result.indexOf('@forward')
      const useIndex = result.indexOf('@use \'quasar')
      expect(useIndex).toBeGreaterThan(forwardIndex)
    })

    it('should handle empty content', () => {
      const transform = getScssTransform('scss', false)
      const input = ''

      const result = transform(input)

      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *')
    })

    it('should handle content with only whitespace', () => {
      const transform = getScssTransform('scss', false)
      const input = '\n\n   \n'

      const result = transform(input)

      expect(result).toContain('@use \'quasar/src/css/variables.sass\' as *')
      expect(result).toContain(input) // Whitespace preserved
    })
  })

  describe('Boolean Logic Verification', () => {
    it('should correctly identify Quasar variables with proper operator precedence', () => {
      const transform = getScssTransform('scss', false)

      // Test case where we have @use but not quasar (should add import)
      const input1 = '@use "./utils" as *;\n.button { color: red; }'
      const result1 = transform(input1)
      expect(result1).toContain('@use \'quasar/src/css/variables.sass\' as *')

      // Test case where we have quasar mention but no @use (should add import because comments don't count)
      const input2 = '/* This file uses quasar framework */\n.button { color: red; }'
      const result2 = transform(input2)
      expect(result2).toContain('@use \'quasar/src/css/variables.sass\' as *') // Should add import

      // Test case where we have both @use and quasar (should not add import)
      const input3 = '@use "quasar/custom" as *;\n.button { color: red; }'
      const result3 = transform(input3)
      expect(result3).toBe(input3) // Should be unchanged

      // Test case where we have content with no quasar references (should add import)
      const input4 = '.button { color: red; }'
      const result4 = transform(input4)
      expect(result4).toContain('@use \'quasar/src/css/variables.sass\' as *')
    })
  })
})
