import type { QuasarIconSets as QuasarIconSet, QuasarUIConfiguration as _QuasarUIConfiguration } from 'quasar'
import type { ModuleOptions } from './module'

type ExtractFont<T extends string> = T extends `svg-${string}` ? never : T
type ExtractSvg<T extends string> = T extends `svg-${infer F}` ? F : never

export type QuasarFontIconSet = ExtractFont<QuasarIconSet>
export type QuasarSvgIconSet = ExtractSvg<QuasarIconSet>

export type ResolveFn = (...paths: string[]) => string

export interface QuasarImports {
  raw: Record<string, string>
  components: QuasarImportData[]
  composables: QuasarImportData[]
  directives: (QuasarImportData & { kebabCase: string })[]
  plugins: QuasarImportData[]
}

export interface QuasarImportData {
  name: string
  path: string
}

export type QuasarUIConfiguration = Omit<_QuasarUIConfiguration, 'lang' | 'capacitor' | 'cordova'> & {
  addressbarColor?: string
  brand?: {
    'dark-page'?: string
  }
}

export interface ModuleContext {
  ssr: boolean
  dev: boolean
  imports: QuasarImports
  options: ModuleOptions
  mode: 'server' | 'client'
  quasarVersion: string
  sassVersion: string | null
  resolveLocal: ResolveFn
  resolveQuasar: ResolveFn
  resolveQuasarExtras: ResolveFn
}

export interface QuasarComponentMetadata {
  mixins?: string[]
  props?: Record<string, QuasarPropMetadata>
}

export type QuasarPropType =
  | 'Boolean'
  | 'Number'
  | 'String'
  | 'Array'
  | 'Object'
  | 'File'
  | 'FileList'
  | 'Element'
  | 'Function'
  | 'Any'
  | 'null'
  | 'undefined'

export interface QuasarPropMetadata {
  type: QuasarPropType | QuasarPropType[]
  default?: any
  required?: boolean
  values?: string[]
  extends?: string
  category?: string
  desc?: string
  examples?: string[]
  addedIn?: string
  tsType?: string
  transformAssetUrls?: boolean
  syncable?: boolean
  internal?: boolean
}
