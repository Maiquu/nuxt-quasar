import type { ModuleContext } from './types'

const when = (condition: boolean, content: string) => condition ? content : ''

export function vuePluginTemplate(context: ModuleContext, ssr: boolean): string {
  const isServer = context.mode === 'server'
  const isClient = !isServer
  const { iconSet } = context.options
  return `\
import { ref, computed, useHead } from "#imports"
import { defineNuxtPlugin } from "#app"
import Quasar from "quasar/src/vue-plugin.js"
${context.options.plugins
    ?.map(plugin => `import ${plugin} from "quasar/${context.imports.raw[plugin]}"`)
    .join('\n') || ''
}
${when(typeof iconSet === 'string',
  `import iconSet from "quasar/icon-set/${iconSet}"`,
)}

export default defineNuxtPlugin((nuxt) => {\n${
  when(isServer, `\
  const ssrContext = {
    req: nuxt.ssrContext.event.req,
    res: nuxt.ssrContext.event.res,
  }`)}\n${
  when(ssr && isClient, `\
  const NuxtPlugin = {
    install({ onSSRHydrated }) {
      nuxt.hook("app:suspense:resolve", () => {
        onSSRHydrated.forEach(fn => fn())
      })
    }
  }`)}\n${
  when(ssr && isServer, `\

  const bodyClasses = ref("")
  const htmlAttrs = ref("")

  const htmlAttrsRecord = computed(() => {
    return Object.fromEntries(
      htmlAttrs
        .split(" ")
        .map(attr => attr.split("="))
    )
  })

  useHead(computed(() => ({
    bodyAttrs: {
      class: bodyClasses.value
    }
  })))

  const NuxtPlugin = {
    install({ ssrContext }) {
      ssrContext._meta = new Proxy({}, {
        get(target, key) {
          if (key === "bodyClasses") {
            return bodyClasses.value
          } else if (key === "htmlAttrs") {
            return htmlAttrs.value
          } else {
            return target[key]
          }
        },
        set(target, key, value) {
          if (key === "bodyClasses") {
            bodyClasses.value = value
          } else if (key === "htmlAttrs") {
            htmlAttrs.value = value
          } else {
            target[key] = value
          }
          return true
        }
      })
    }
  }`)}

  nuxt.vueApp.use(Quasar, {
    ${when(typeof iconSet === 'string', 'iconSet,')}
    plugins: {
      ${when(ssr, 'NuxtPlugin, ')
      + context.options.plugins?.join(`,\n${' '.repeat(6)}`) || []}
    }
  }${when(isServer, ', ssrContext')})
})`
}
