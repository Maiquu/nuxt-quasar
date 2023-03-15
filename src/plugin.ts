import { ModuleContext } from './types'

const when = (condition: boolean, content: string) => condition ? content : ''

export function vuePluginTemplate(context: ModuleContext): string {
  const isServer = context.mode === 'server'
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
  }`)}
  nuxt.vueApp.use(Quasar, {
    plugins: {${context.options.plugins || []}}
  }${when(isServer, ', ssrContext')})
})`
}
