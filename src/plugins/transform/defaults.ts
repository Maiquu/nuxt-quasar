import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { builders, generateCode, loadFile } from 'magicast'
import { getDefaultExportOptions } from 'magicast/helpers'
import { logger } from '@nuxt/kit'
import type { Plugin as VitePlugin } from 'vite'
import { fsPathFromUrl, readJSON } from '../../utils'

const QUASAR_COMPONENT_RE = /(?:([\\\/])node_modules\1|^)quasar(?=\1)([\\\/])src\2components\2[a-z-]+?\2(Q[a-zA-Z]+?)\.js(\?.*)?$/
const QUASAR_COMPONENT_WITH_DEFAULTS_PREFIX = '/__quasar/components'
const QUASAR_IMPORT_RE = /([\\\/])node_modules\1quasar\1src\1/

const MAGICAST_UTILS_ID = '/__quasar/magicast-utils.mjs'
const MERGE_FN = '$$merge'
const DEFAULT_FN = '$$default'
const VALUES_FN = '$$values'

interface ResolveMetadata {
  name: string
  defaults: Record<string, any>
  originalPath: string
}

interface PropOptions {
  type?: any
  required?: boolean
  default?: any
  validator?(value: any): boolean
}

export function transformDefaultUtilsPlugin(): VitePlugin {
  return {
    name: 'quasar:magicast-utils',

    resolveId(id) {
      if (id === MAGICAST_UTILS_ID)
        return MAGICAST_UTILS_ID
    },

    load(id) {
      if (id === MAGICAST_UTILS_ID) {
        return `\
const clone = (value) => JSON.parse(JSON.stringify(value))
export const ${MERGE_FN} = (a,b) => ({ ...a, ...b })
export const ${DEFAULT_FN} = (value) => () => clone(value)
export const ${VALUES_FN} = (values) => (value) => values.includes(value)
`
      }
    },
  }
}

export function transformDefaultsPlugin(context: ModuleContext): VitePlugin {
  const loadCache = new Map<string, Promise<{ code: string; map?: string }>>()
  const resolveMetadata = new Map<string, ResolveMetadata>()
  const deepDefaultsEnabled = context.options.components?.deepDefaults || false
  return {
    name: 'quasar:defaults',
    resolveId: {
      order: 'pre',
      async handler(source, importer, options) {
        const isRelative = source.startsWith('.')

        // If importer is a component with defaults, we need to handle relative imports
        if (isRelative && importer?.startsWith(QUASAR_COMPONENT_WITH_DEFAULTS_PREFIX)) {
          const { originalPath } = resolveMetadata.get(importer)!
          return resolve(dirname(originalPath), source)
        }

        // Try to resolve component imports that are nested in other components
        if (deepDefaultsEnabled) {
          if (importer?.match(QUASAR_IMPORT_RE) && isAbsolute(importer)) {
            source = resolve(dirname(importer), source)
          }
        }

        // Check if source is a quasar component
        const match = source.match(QUASAR_COMPONENT_RE)
        if (match) {
          // Wait for it to be resolved by other plugins
          const resolution = await this.resolve(source, importer, {
            ...options,
            skipSelf: true,
          })

          const name = match[3] as keyof QuasarComponentDefaults
          const defaults = context.options.components?.defaults?.[name]

          if (resolution && defaults) {
            const originalPath = fsPathFromUrl(
              resolution.id.startsWith('quasar/')
                ? context.resolveQuasar(resolution.id.slice('quasar/'.length))
                : resolution.id,
            )
            resolution.id = `${QUASAR_COMPONENT_WITH_DEFAULTS_PREFIX}/${name}.js`
            if (!resolveMetadata.has(resolution.id)) {
              resolveMetadata.set(resolution.id, {
                name,
                defaults,
                originalPath,
              })
            }
          }
          return resolution
        }
      },
    },

    load(id) {
      if (id.startsWith(QUASAR_COMPONENT_WITH_DEFAULTS_PREFIX)) {
        if (loadCache.has(id)) {
          return loadCache.get(id)
        } else {
          const metadata = resolveMetadata.get(id)!
          const promise = loadComponentWithDefaults(metadata, context)
            .catch(async (err) => {
              const code = await readFile(metadata.originalPath, 'utf-8')
              logger.error(`Failed to apply defaults to component ${metadata.name}.`, err)
              return { code }
            })
          loadCache.set(id, promise)
          return promise
        }
      }
    },

  }
}

async function loadComponentWithDefaults({ name, defaults, originalPath }: ResolveMetadata, { resolveQuasar }: ModuleContext): Promise<{ code: string; map?: string }> {
  const module = await loadFile(originalPath)
  const sourcePath = resolveQuasar('src')
  const componentRelativePath = relative(sourcePath, originalPath).slice(0, -'.js'.length)
  const componentDefaultEntries = Object.entries(defaults)
  const componentOptions = getDefaultExportOptions(module)
  const componentMetadata = await readJSON(resolve(sourcePath, `${componentRelativePath}.json`))
  const apiExtends = await readJSON(resolveQuasar('src/api.extends.json')) as Required<QuasarMetadata>

  const getPropMetadata = async (metadata: QuasarMetadata, propName: string): Promise<QuasarPropMetadata> => {
    const propMetadata = metadata.props?.[propName]
    if (propMetadata) {
      return propMetadata
    } else if (metadata.mixins?.length) {
      for (const mixin of metadata.mixins) {
        const mixinMetadata = await readJSON(resolve(sourcePath, `${mixin}.json`))
        const propMetadata = await getPropMetadata(mixinMetadata, propName)
        if (propMetadata)
          return propMetadata
      }
    }
    throw new Error(`Unknown ${name} prop: [${propName}]`)
  }

  let importedValuesFn = false
  let importedDefaultsFn = false

  const createPropOptions = (metadata: QuasarPropMetadata, defaultValue: any): PropOptions => {
    const options: PropOptions = {}
    if (metadata.extends) {
      metadata = apiExtends.props[metadata.extends]
    }
    // type
    options.type = Array.isArray(metadata.type)
      ? metadata.type.map(t => builders.raw(t))
      : builders.raw(metadata.type)

    // required
    if (metadata.required) {
      options.required = metadata.required
    }
    // default
    if (typeof defaultValue === 'object') {
      if (!importedDefaultsFn) {
        importedDefaultsFn = true
        module.imports.$add({
          from: MAGICAST_UTILS_ID,
          imported: DEFAULT_FN,
        })
      }
      options.default = builders.functionCall(DEFAULT_FN, defaultValue)
    } else {
      options.default = defaultValue
    }
    // validator
    if (metadata.values) {
      if (!importedValuesFn) {
        importedValuesFn = true
        module.imports.$add({
          from: MAGICAST_UTILS_ID,
          imported: VALUES_FN,
        })
      }
      options.validator = builders.functionCall(VALUES_FN, metadata.values)
    }
    return options
  }

  // If component props are referenced by an identifier, we need to recreate all props by their metadata (ex: QCheckbox, QField)
  if (componentOptions.props.$type === 'identifier') {
    module.imports.$add({
      from: MAGICAST_UTILS_ID,
      imported: MERGE_FN,
    })
    const newPropOptions = await Promise.all(
      componentDefaultEntries
        .map(async ([propName, defaultValue]) => {
          const propMetadata = await getPropMetadata(componentMetadata, propName)
          const propOptions = createPropOptions(propMetadata, defaultValue)
          return { name: propName, options: propOptions }
        }),
    )
    componentOptions.props = builders.functionCall(MERGE_FN,
      componentOptions.props,
      Object.fromEntries(
        newPropOptions.map(r => [r.name, r.options])),
    )
  } else if (componentOptions.props.$type === 'object') {
    const componentProps = componentOptions.props
    for (let [propName, defaultValue] of componentDefaultEntries) {
      const propOptions = componentProps[propName]
      if (propOptions) {
        if (typeof defaultValue === 'object') {
          if (!importedDefaultsFn) {
            importedDefaultsFn = true
            module.imports.$add({
              imported: DEFAULT_FN,
              from: MAGICAST_UTILS_ID,
            })
          }
          defaultValue = builders.functionCall(DEFAULT_FN, defaultValue)
        }

        if (propOptions.$type === 'object') {
          propOptions.default = defaultValue
        } else if (
          propOptions.$type === 'array'
          // TODO: Here we assume that the identifier is a constructor (ex: String, Number), but it might be a reference to another object.
          || propOptions.$type === 'identifier'
        ) {
          componentProps[propName] = {
            type: propOptions,
            default: defaultValue,
          }
        } else {
          throw new Error(`Unexpected prop definition type used at ${name}.props.${propName}, please open an issue.`)
        }
      } else {
        const propMetadata = await getPropMetadata(componentMetadata, propName)
        const propOptions = createPropOptions(propMetadata, defaultValue)
        componentProps[propName] = propOptions
      }
    }
  } else {
    throw new Error(`Unexpected props definition type used at ${name}.props, please open an issue.`)
  }

  return generateCode(module)
}
