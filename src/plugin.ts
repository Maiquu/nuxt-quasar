import type { ModuleOptions } from './module'


export function vuePluginTemplate(options: ModuleOptions, isServer: boolean): string {
  return `\
import { Quasar, ${!isServer ? options.plugins : []}} from 'quasar'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(Quasar, {
      plugins: {${!isServer ? options.plugins : []}}
    }, {${isServer ? `\
      req: nuxt.ssrContext.event.req,
      res: nuxt.ssrContext.event.res,` : ''}})
})`
}
