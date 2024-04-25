import { moduleName } from '../constants'
import type { ModuleContext } from '../types'

export async function generateTemplateComponentsShim(context: Omit<ModuleContext, 'mode'>): Promise<string> {
  const componentNames = context.imports.components.map(c => c.name)
  return `\
type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T] & keyof T

type OptionalKeys<T extends object> = Exclude<{
  [K in keyof T]: T extends Record<K, T[K]> ? never : K
}[keyof T], undefined>

type OmitMatching<T extends object, V> = Omit<T, KeysMatching<T, V>>

type OmitFnProps<T extends object> = OmitMatching<T, ((...args: any[]) => any) | undefined>

type PickOptionalProps<T extends object> = Pick<T, OptionalKeys<T>>

declare module '${moduleName}' {
  interface QuasarComponentDefaults {\n${componentNames.map(name => `\
    ${name}?: PickOptionalProps<OmitFnProps<import("quasar").${name}Props>>`,
  ).join('\n')}
  }
}

export {}
`
}
