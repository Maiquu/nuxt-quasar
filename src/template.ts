import type { ModuleContext } from './types'
import { uniq } from './utils'

function when(condition: any, content: string | (() => string)) {
  return condition
    ? typeof content === 'function' ? content() : content
    : ''
}

export function generateTemplateQuasarConfig(context: Pick<ModuleContext, 'options' | 'imports'>): string {
  const plugins = uniq(context.options.plugins || [])
  const { config, lang, iconSet } = context.options
  return `\
${when(lang, () => `import lang from "quasar/lang/${lang}.mjs"`)}
${when(typeof iconSet === 'string', () => `import iconSet from "quasar/icon-set/${iconSet}.mjs"`)}
${plugins
  .map(plugin => `import ${plugin} from "quasar/${context.imports.raw[plugin]}"`)
  .join('\n') || ''
}

export const quasarNuxtConfig = {
  ${when(lang, 'lang,')}
  ${typeof iconSet === 'string'
    ? 'iconSet'
    : `iconSet: ${iconSet ? JSON.stringify(iconSet) : '"material-icons"'}`},
  plugins: {${
    plugins.join(',') || ''
  }},
  ${when(config, () => `config: ${JSON.stringify(config)}`)}
}`
}
