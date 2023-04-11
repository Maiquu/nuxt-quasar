import { createUnplugin } from 'unplugin'
import type { ProxifiedIdentifier, ProxifiedObject } from 'magicast'
import { builders, generateCode, loadFile } from 'magicast'
import { getDefaultExportOptions } from 'magicast/helpers'
import type { ModuleContext } from '../types/module'
import { capitalize } from '../utils'

const QUASAR_COMPONENT = /\/node_modules\/quasar\/src\/components\/[a-z-]+?\/Q[a-zA-Z]+?\.js(\?.*)?/

const isSupported = (value: unknown) => {
  return typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
}

export const transformDefaultsPlugin = createUnplugin((module: ModuleContext) => {
  const componentDefaults = (module.options.components || {}) as Record<string, Record<string, any>>
  return {
    name: 'quasar:defaults',

    transformInclude: id => QUASAR_COMPONENT.test(id),

    async transform(code, id) {
      const [path] = id.split('?', 2)
      const module = await loadFile(path)
      const { name, props } = getDefaultExportOptions(module)
      const defaults = componentDefaults[name]
      if (defaults) {
        for (const [propName, defaultValue] of Object.entries(defaults)) {
          if (!isSupported(defaultValue))
            continue

          if (props[propName]) {
            const prop = props[propName] as ProxifiedIdentifier | ProxifiedObject
            if (prop.$ast.type === 'Identifier') {
              props[propName] = {
                type: builders.raw(prop.$ast.name),
                default: defaultValue,
              }
            }
            else if (prop.$type === 'object') {
              props[propName].default = defaultValue
            }
          }
          else {
            props[propName] = {
              // Flawed
              type: builders.raw(capitalize(typeof defaultValue)),
              default: defaultValue,
            }
          }
        }
        return generateCode(module)
      }
      return code
    },

  }
})
