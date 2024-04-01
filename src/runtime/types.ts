import type { IncomingMessage, ServerResponse } from 'node:http'
import type { QVueGlobals, QuasarIconSet, QuasarLanguage } from 'quasar'
import type { App as VueApp } from 'vue'

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on client-side
 **/
export interface QuasarPluginClientContext {
  parentApp: VueApp<any>
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  onSSRHydrated: (() => void)[]
}

/**
 * This type is for future reference. Object with this interface gets passed to Quasar plugins on server-side
 **/
export interface QuasarPluginServerContext {
  parentApp: VueApp<any>
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  ssrContext: QuasarSSRContext
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

export interface QuasarServerPlugin {
  install(context: QuasarPluginServerContext): void
}

export interface QuasarClientPlugin {
  install(context: QuasarPluginClientContext): void
}

export type QuasarPlugin = QuasarServerPlugin | QuasarClientPlugin
