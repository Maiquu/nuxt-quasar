import type { IncomingMessage, ServerResponse } from 'node:http'
import Quasar from 'quasar/src/vue-plugin.js'
import useQuasar from 'quasar/src/composables/use-quasar.js'
import type { QuasarClientPlugin, QuasarSSRContext, QuasarServerPlugin } from './types'
import { omit } from './utils'
import { computed, defineNuxtPlugin, ref, useHead } from '#imports'
import { quasarNuxtConfig } from '#build/quasar.config.mjs'

export default defineNuxtPlugin((nuxt) => {
  const { lang, iconSet, plugins, config = {} } = quasarNuxtConfig
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
  }, ssrContext)

  const quasar = useQuasar()

  return {
    provide: {
      q: quasar,
    },
  }
})
