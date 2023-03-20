import { ModuleContext } from './types'

const when = (condition: boolean, content: string) => condition ? content : ''

export function vuePluginTemplate(context: ModuleContext, ssr: boolean): string {
  const isServer = context.mode === 'server'
  const isClient = !isServer
  return `\
import { defineNuxtPlugin } from "#app"
import Quasar from "quasar/src/vue-plugin.js"
${context.options.plugins
  ?.map(plugin => `import ${plugin} from "quasar/${context.imports.raw[plugin]}"`)
  .join('\n') || ''
}


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
    plugins: { ${
      when(ssr && isClient, 'NuxtPlugin, ')}${
      context.options.plugins?.join(', ') || []
    } }
  }${when(isServer, ', ssrContext')})
})`
}
