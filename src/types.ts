import type { IncomingMessage, ServerResponse } from 'node:http'
import type { App as VueApp } from 'vue'
import type { QVueGlobals, QuasarIconSet, QuasarLanguage } from 'quasar'
import type { ModuleOptions } from './module'

export type QuasarPlugins =
  | 'AddressbarColor'
  | 'AppFullscreen'
  | 'AppVisibility'
  | 'BottomSheet'
  | 'Cookies'
  | 'Dark'
  | 'Dialog'
  | 'Loading'
  | 'LoadingBar'
  | 'LocalStorage'
  | 'Meta'
  | 'Notify'

/** Icon collections provided by `@quasar/extras` */
type QuasarCommonIconSets =
  | 'bootstrap-icons'
  | 'eva-icons'
  | 'fontawesome-v5'
  | 'fontawesome-v6'
  | 'ionicons-v4'
  | 'line-awesome'
  | 'material-icons'
  | 'material-icons-outlined'
  | 'material-icons-round'
  | 'material-icons-sharp'
  | 'material-symbols-outlined'
  | 'material-symbols-rounded'
  | 'material-symbols-sharp'
  | 'mdi-v4'
  | 'mdi-v5'
  | 'mdi-v6'
  | 'mdi-v7'
  | 'themify'

export type QuasarFontIconSets = QuasarCommonIconSets
| 'mdi-v3'

export type QuasarSvgIconSets = QuasarCommonIconSets
| 'svg-ionicons-v5'
| 'svg-ionicons-v6'

export interface QuasarImports {
  raw: Record<string, string>
  components: ImportData[]
  composables: ImportData[]
  directives: (ImportData & { kebabCase: string })[]
  plugins: ImportData[]
}

export interface ImportData {
  name: string
  path: string
}

export interface ModuleContext {
  imports: QuasarImports
  options: ModuleOptions
  mode: 'server' | 'client'
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on client-side
 **/
export interface QuasarPluginClientContext {
  parentApp: VueApp
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  onSSRHydrated: (() => void)[]
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on server-side
 **/
export interface QuasarPluginServerContext {
  parentApp: VueApp
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  ssrContext: any
}

export interface QuasarSSRContext {
  req: IncomingMessage
  res: ServerResponse
  $q: any
  _meta: {
    htmlAttrs: string
    headTags: string
    endingHeadTags: string
    bodyClasses: string
    bodyAttrs: string
    bodyTags: string
  }
  _modules: any[]
  onRendered: ((...args: any[]) => any)[]
  __qPrevLang: string
}
