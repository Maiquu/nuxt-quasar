/* eslint-disable import/no-duplicates */
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { App as VueApp } from 'vue'
import type { QuasarIconSets as QuasarIconSet } from 'quasar'
import type * as _ from 'quasar'
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

export interface ModuleContext {
  ssr: boolean
  dev: boolean
  imports: QuasarImports
  options: ModuleOptions
  mode: 'server' | 'client'
  resolveLocal: ResolveFn
  resolveQuasar: ResolveFn
  resolveQuasarExtras: ResolveFn
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on client-side
 **/
export interface QuasarPluginClientContext {
  parentApp: VueApp<any>
  $q: _.QVueGlobals
  lang: _.QuasarLanguage
  iconSet: _.QuasarIconSet
  onSSRHydrated: (() => void)[]
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on server-side
 **/
export interface QuasarPluginServerContext {
  parentApp: VueApp<any>
  $q: _.QVueGlobals
  lang: _.QuasarLanguage
  iconSet: _.QuasarIconSet
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

export interface QuasarFrameworkInnerConfiguration {
  brand?: {
    primary?: string
    secondary?: string
    accent?: string
    dark?: string
    'dark-page'?: string
    positive?: string
    negative?: string
    info?: string
    warning?: string
  }
  dark?: boolean | 'auto'
  lang?: {
    noHtmlAttrs?: boolean
  }
  loading?: {
    delay?: number
    message?: false | string
    html?: boolean
    boxClass?: string
    spinnerSize?: number
    spinnerColor?: string
    messageColor?: string
    backgroundColor?: string
    customClass?: string
  }
  ripple?: boolean | {
    early?: boolean
    stop?: boolean
    center?: boolean
    color?: string
    keyCodes?: number[] | number
  }
  loadingBar?: {
    position?: string
    size?: string
    color?: string
    reverse?: boolean
    skipHijack?: boolean
  }
  notify?: {
    type?: string
    color?: string
    textColor?: string
    message?: string
    caption?: string
    html?: boolean
    icon?: string
    iconColor?: string
    iconSize?: string
    avatar?: string
    spinner?: boolean
    spinnerColor?: string
    spinnerSize?: string
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center'
    group?: boolean | string | number
    badgeColor?: string
    badgeTextColor?: string
    badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    badgeStyle?: _.VueStyleProp
    badgeClass?: _.VueClassProp
    progress?: boolean
    progressClass?: _.VueClassProp
    classes?: string
    attrs?: object
    timeout?: number
    closeBtn?: boolean | string
    multiLine?: boolean
    actions?: { icon: string; color: string }[]
  }
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
