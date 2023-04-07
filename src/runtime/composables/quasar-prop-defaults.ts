// Source: https://github.com/quasarframework/quasar/discussions/8761#discussioncomment-1042529
import type { ComponentConstructor } from 'quasar'

type ExtractComponentProps<T> = T extends ComponentConstructor<infer X> ? X['$props'] : never
/**
 * Sets the default prop values for a Quasar component
 * @param component
 * @param propDefaults
 */
export const useQuasarPropDefaults = <T extends ComponentConstructor>(
  component: T,
  propDefaults: {
    [K in keyof Partial<ExtractComponentProps<T>>]: ExtractComponentProps<T>[K];
  },
) => {
  for (const key in propDefaults) {
    const prop = component.props[key]
    switch (typeof prop) {
      case 'object':
        prop.default = propDefaults[key]
        break
      case 'function':
        component.props[key] = {
          type: prop,
          default: propDefaults[key],
        }
        break
      case 'undefined':
        throw new Error(`Nuxt-Quasar - The Quasar prop type was undefined on key '${key}', this happened when setting the Quasar default prop values`)
      default:
        throw new Error(`Nuxt-Quasar - An unknown Quasar prop type with '${typeof prop}' was set to configure the default prop values`)
    }
  }
}
