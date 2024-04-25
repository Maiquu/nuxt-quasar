import type { ModuleContext } from '../types'
import { hasKeys, uniq } from '../utils'

function when(condition: any, content: string | (() => string)) {
  return condition
    ? typeof content === 'function' ? content() : content
    : ''
}

export function generateTemplateQuasarConfig(context: Pick<ModuleContext, 'options' | 'imports'>): string {
  const plugins = uniq(context.options.plugins || [])
  const { config, lang, iconSet, components } = context.options
  const componentsWithDefaults = Object
    .entries(components?.defaults || {})
    .filter(([_, props]) => hasKeys(props))
    .map(([name]) => name)

  return `\
${when(lang, () => `import lang from "quasar/lang/${lang}.mjs"`)}
${when(typeof iconSet === 'string', () => `import iconSet from "quasar/icon-set/${iconSet}.mjs"`)}
${when(plugins.length, () => `import { ${plugins} } from "quasar"`)}
${when(componentsWithDefaults.length, () => `import { ${componentsWithDefaults} } from "quasar"`)}

export const componentsWithDefaults = { ${componentsWithDefaults} }

export const appConfigKey = ${JSON.stringify(context.options.appConfigKey)}

export const quasarNuxtConfig = {
  ${when(lang, 'lang,')}
  ${typeof iconSet === 'string'
    ? 'iconSet'
    : `iconSet: ${iconSet ? JSON.stringify(iconSet) : '"material-icons"'}`},
  components: ${JSON.stringify(components || {})},
  plugins: {${
    plugins.join(',') || ''
  }},
  ${when(config, () => `config: ${JSON.stringify(config)}`)}
}`
}
