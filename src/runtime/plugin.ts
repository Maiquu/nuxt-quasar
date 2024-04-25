import type { IncomingMessage, ServerResponse } from 'node:http'
import { Quasar, useQuasar } from 'quasar'
import type { UseHeadInput } from 'unhead'
import type { QVueGlobals, QuasarIconSet, QuasarLanguage, QuasarUIConfiguration } from 'quasar'
import type { App as VueApp } from 'vue'
import { defuFn } from 'defu'
import { computed, defineNuxtPlugin, reactive, useAppConfig, useHead, watch } from '#imports'
import { appConfigKey, componentsWithDefaults, quasarNuxtConfig } from '#build/quasar.config.mjs'

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

function getUpdatedDefaults<T extends object>(cfg: T, prevCfg: T) {
  const prevKeys = Object.keys(prevCfg)
  return {
    ...Object.fromEntries(prevKeys.map(k => [k, undefined])),
    ...cfg,
  }
}

function getPrimaryColor() {
  return getComputedStyle(document.body).getPropertyValue('--q-primary').trim()
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
  const quasarAppConfig = useAppConfig()[appConfigKey] as QuasarUIConfiguration & { addressbarColor?: string }
  const { lang, iconSet, plugins, components } = quasarNuxtConfig
  let ssrContext: { req: IncomingMessage; res: ServerResponse } | undefined
  let quasarProxy: QuasarServerPlugin | QuasarClientPlugin
  // Since brand used in `nuxt.config` is pushed to `nuxt.options.css`, we exclude it here
  let config = defuFn(quasarAppConfig, omit(quasarNuxtConfig.config, ['brand']))

  if (import.meta.server) {
    const BRAND_RE = /--q-(?:.+?):(?:.+?);/g
    const meta = reactive({
      bodyClasses: '',
      htmlAttrs: '',
      endingHeadTags: '',
    })
    type MetaKey = keyof typeof meta
    const htmlAttrsRecord = computed(() =>
      Object.fromEntries(
        meta.htmlAttrs
          .split(' ')
          .map(attr => attr.split('=')),
      ),
    )
    // NOTE: Quasar currently only appends `endingHeadTags` with brand variables, this may break in future
    const bodyStyles = computed(() => {
      return [...meta.endingHeadTags.matchAll(BRAND_RE)]
        .map(match => match[0])
        .join('')
    })

    useHead(
      computed(() => ({
        bodyAttrs: {
          class: meta.bodyClasses,
          style: bodyStyles.value,
        },
        htmlAttrs: htmlAttrsRecord.value,
      } as UseHeadInput<any>)),
    )
    ssrContext = {
      req: nuxt.ssrContext!.event.node.req,
      res: nuxt.ssrContext!.event.node.res,
    }
    quasarProxy = {
      install({ ssrContext }) {
        meta.bodyClasses = ssrContext._meta.bodyClasses
        meta.htmlAttrs = ssrContext._meta.htmlAttrs
        meta.endingHeadTags = ssrContext._meta.endingHeadTags
        ssrContext._meta = new Proxy({} as Record<string | symbol, any>, {
          get(target, key) {
            return meta[key as MetaKey] ?? target[key]
          },
          set(target, key, value) {
            if (typeof meta[key as MetaKey] === 'string') {
              meta[key as MetaKey] = value
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
    config,
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

  if (import.meta.dev && import.meta.client) {
    watch(
      () => quasarAppConfig,
      (newAppConfig) => {
        const prevConfig = config
        config = defuFn(newAppConfig, quasarNuxtConfig.config)
        quasar.addressbarColor?.set(config.addressbarColor || getPrimaryColor())
        const modifiedBrand = getUpdatedDefaults(
          config.brand || {},
          prevConfig.brand || {},
        )
        for (const [name, color] of Object.entries(modifiedBrand)) {
          if (!color) {
            document.body.style.removeProperty(`--q-${name}`)
          } else {
            document.body.style.setProperty(`--q-${name}`, color)
          }
        }
        if (prevConfig.dark !== config.dark) {
          quasar.dark.set(config.dark || false)
        }
        quasar.loading?.setDefaults(getUpdatedDefaults(
          config.loading || {},
          prevConfig.loading || {},
        ))
        quasar.loadingBar?.setDefaults(getUpdatedDefaults(
          config.loadingBar || {},
          prevConfig.loadingBar || {},
        ))
        plugins.Notify?.setDefaults(getUpdatedDefaults(
          config.loadingBar || {},
          prevConfig.loadingBar || {},
        ))
      },
      { deep: true },
    )
  }

  return {
    provide: {
      q: quasar,
    },
  }
})
