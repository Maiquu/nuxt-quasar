import type { ModuleContext } from './types'

const when = (condition: boolean, content: string) => condition ? content : ''

export function vuePluginTemplate(context: ModuleContext, ssr: boolean): string {
  const isServer = context.mode === 'server'
  const isClient = !isServer
  const { iconSet } = context.options
  return `\
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
  }`)}${
  when(ssr && isClient, `\
  const NuxtPlugin = {
    install({ onSSRHydrated }) {
      nuxt.hook('app:suspense:resolve', () => {
        onSSRHydrated.forEach(fn => fn())
      })
    }
  }`)}

  nuxt.vueApp.use(Quasar, {
    ${when(typeof iconSet === 'string', 'iconSet,')}
    plugins: {
      ${when(ssr && isClient, 'NuxtPlugin, ')
      + context.options.plugins?.join(`,\n${' '.repeat(6)}`) || []}
    }
  }${when(isServer, ', ssrContext')})
})`
}
