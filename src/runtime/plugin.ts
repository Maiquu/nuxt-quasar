import type { IncomingMessage, ServerResponse } from 'node:http'
import { Quasar, useQuasar } from 'quasar'
import type { QVueGlobals, QuasarIconSet, QuasarLanguage } from 'quasar'
import type { App as VueApp } from 'vue'
import { computed, defineNuxtPlugin, ref, useHead } from '#imports'
import { componentsWithDefaults, quasarNuxtConfig } from '#build/quasar.config.mjs'

interface QuasarPluginClientContext {
  parentApp: VueApp<any>
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  onSSRHydrated: (() => void)[]
}

interface QuasarPluginServerContext {
  parentApp: VueApp<any>
  $q: QVueGlobals
  lang: QuasarLanguage
  iconSet: QuasarIconSet
  ssrContext: QuasarSSRContext
}

interface QuasarSSRContext {
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

interface QuasarServerPlugin {
  install(context: QuasarPluginServerContext): void
}

interface QuasarClientPlugin {
  install(context: QuasarPluginClientContext): void
}

function omit<T extends object, K extends keyof T & string>(object: T, keys: K[]): Omit<T, K>
function omit(object: Record<string, any>, keys: string[]): Record<string, any> {
  return Object.keys(object).reduce((output, key) => {
    if (!keys.includes(key)) {
      output[key] = object[key]
    }
    return output
  }, {} as Record<string, any>)
}

export default defineNuxtPlugin((nuxt) => {
  const { lang, iconSet, plugins, config = {}, components } = quasarNuxtConfig
  let ssrContext: { req: IncomingMessage; res: ServerResponse } | undefined
  let quasarProxy: QuasarServerPlugin | QuasarClientPlugin

  if (import.meta.server) {
    const bodyClasses = ref('')
    const htmlAttrs = ref('')
    const htmlAttrsRecord = computed(() =>
      Object.fromEntries(
        htmlAttrs.value
          .split(' ')
          .map(attr => attr.split('=')),
      ),
    )
    useHead(
      computed(() => ({
        bodyAttrs: {
          class: bodyClasses.value,
        },
        htmlAttrs: htmlAttrsRecord.value,
      })),
    )
    ssrContext = {
      req: nuxt.ssrContext!.event.node.req,
      res: nuxt.ssrContext!.event.node.res,
    }
    quasarProxy = {
      install({ ssrContext }) {
        bodyClasses.value = ssrContext._meta.bodyClasses
        htmlAttrs.value = ssrContext._meta.htmlAttrs
        ssrContext._meta = new Proxy({} as Record<string | symbol, any>, {
          get(target, key) {
            if (key === 'bodyClasses') {
              return bodyClasses.value
            } else if (key === 'htmlAttrs') {
              return htmlAttrs.value
            } else {
              return target[key]
            }
          },
          set(target, key, value) {
            if (key === 'bodyClasses') {
              bodyClasses.value = value
            } else if (key === 'htmlAttrs') {
              htmlAttrs.value = value
            } else {
              target[key] = value
            }
            return true
          },
        }) as QuasarSSRContext['_meta']
      },
    } as QuasarServerPlugin
  } else {
    quasarProxy = {
      install({ onSSRHydrated }) {
        nuxt.hook('app:suspense:resolve', () => {
          onSSRHydrated.forEach(fn => fn())
        })
      },
    } as QuasarClientPlugin
  }

  nuxt.vueApp.use(Quasar, {
    lang,
    iconSet,
    plugins: {
      quasarProxy,
      ...plugins,
    },
    config: omit(config, ['brand']),
  // @ts-expect-error Private Argument
  }, ssrContext)

  const quasar = useQuasar()

  const asDefault = (value: unknown) => typeof value === 'object' ? () => value : value

  for (const [name, propDefaults] of Object.entries(components.defaults || {})) {
    const component = componentsWithDefaults[name]
    for (const [propName, defaultValue] of Object.entries(propDefaults)) {
      const propConfig = component.props[propName]
      if (typeof propConfig === 'object') {
        propConfig.default = asDefault(defaultValue)
      } else if (typeof propConfig === 'function') {
        component.props[propName] = {
          type: propConfig,
          default: asDefault(defaultValue),
        }
      }
    }
  }

  return {
    provide: {
      q: quasar,
    },
  }
})
