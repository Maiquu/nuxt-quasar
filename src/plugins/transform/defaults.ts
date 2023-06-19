import { dirname, isAbsolute, relative, resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { builders, generateCode, loadFile } from 'magicast'
import { getDefaultExportOptions } from 'magicast/helpers'
import { logger } from '@nuxt/kit'
import type { Plugin as VitePlugin } from 'vite'
import type { ModuleContext, QuasarComponentDefaults, QuasarComponentMetadata, QuasarPropMetadata, QuasarPropType } from '../../types'
import { fsPathFromUrl, kebabCase, readJSON } from '../../utils'

const QUASAR_COMPONENT_RE = /(?:([\\\/])node_modules\1|^)quasar(?=\1)([\\\/])src\2components\2[a-z-]+?\2(Q[a-zA-Z]+?)\.js(\?.*)?$/
const QUASAR_COMPONENT_WITH_DEFAULTS_PREFIX = '/__quasar/components'
const QUASAR_IMPORT_RE = /([\\\/])node_modules\1quasar\1src\1/

const MERGE_FN = '__merge__'
const DEFAULT_FN = '__default__'
const VALUES_FN = '__values__'

interface ResolveMetadata {
  name: string
  defaults: Record<string, any>
  originalPath: string
}

export interface BuildContext {
  imports: Set<string>
  extended: { props: Record<string, QuasarPropMetadata> }
  sourcePath: string
}

export interface PropOptions {
  type?: any
  required?: boolean
  default?: any
  validator?(value: any): boolean
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

function isValidConstructor(type: QuasarPropType) {
  return !['null', 'undefined', 'Any'].includes(type)
}

export function createPropOptions(context: BuildContext, metadata: QuasarPropMetadata, defaultValue: any): PropOptions {
  const options: PropOptions = {}
  if (metadata.extends) {
    metadata = context.extended.props[metadata.extends]
  }
  // type
  if (Array.isArray(metadata.type)) {
    const types = metadata.type
      .filter(isValidConstructor)
      .map(t => builders.raw(t))
    if (types.length > 0) {
      options.type = types
    }
  } else if (isValidConstructor(metadata.type)) {
    options.type = builders.raw(metadata.type)
  }

  // required
  if (metadata.required) {
    options.required = metadata.required
  }
  // default
  if (typeof defaultValue === 'object') {
    context.imports.add(DEFAULT_FN)
    options.default = builders.functionCall(DEFAULT_FN, defaultValue)
  } else {
    options.default = defaultValue
  }
  // validator
  if (metadata.values) {
    context.imports.add(VALUES_FN)
    options.validator = builders.functionCall(VALUES_FN, metadata.values)
  }
  return options
}

export async function getPropMetadata(context: BuildContext, metadata: QuasarComponentMetadata, componentName: string, propName: string): Promise<QuasarPropMetadata> {
  const propMetadata = metadata.props?.[propName]
  if (propMetadata) {
    return propMetadata
  } else if (metadata.mixins?.length) {
    for (const mixin of metadata.mixins) {
      const mixinMetadata = await readJSON(resolve(context.sourcePath, `${mixin}.json`))
      const propMetadata = await getPropMetadata(context, mixinMetadata, componentName, propName)
      if (propMetadata)
        return propMetadata
    }
  }
  throw new Error(`Unknown ${componentName} prop: [${propName}]`)
}

function assertDefaults(defaults: Record<string, any>) {
  for (const value of Object.values(defaults)) {
    if (typeof value === 'function')
      throw new TypeError('Component defaults does not support default values that are functions')
  }
}

export async function loadComponentWithDefaults(
  { name: componentName, defaults, originalPath }: ResolveMetadata,
  { resolveLocal, resolveQuasar }: ModuleContext,
): Promise<{ code: string; map?: string }> {
  assertDefaults(defaults)
  const module = await loadFile(originalPath)
  const magicastUtils = resolveLocal('runtime/magicastUtils')
  const sourcePath = resolveQuasar('src')
  const componentRelativePath = relative(sourcePath, originalPath).slice(0, -'.js'.length)
  const componentDefaultEntries = Object.entries(defaults)
  const componentOptions = getDefaultExportOptions(module)
  const componentMetadata = await readJSON(resolve(sourcePath, `${componentRelativePath}.json`))
  const apiExtends = await readJSON(resolveQuasar('src/api.extends.json')) as { props: Record<string, QuasarPropMetadata> }

  const buildContext: BuildContext = {
    imports: new Set(),
    extended: apiExtends,
    sourcePath,
  }

  /**
   * If component props are referenced by an identifier, we need to recreate all props by their metadata (ex: QCheckbox, QField)
   *
   * @example
   *
   * import { useCheckboxProps } from './composables'
   *
   * export default defineComponentDefaults({
   *   name: 'checkbox',
   *   props: useCheckboxProps
   *   setup() {
   *     // ...
   *   }
   * })
   */
  if (componentOptions.props.$type === 'identifier') {
    buildContext.imports.add(MERGE_FN)
    const newPropOptions = await Promise.all(
      componentDefaultEntries
        .map(async ([propName, defaultValue]) => {
          const propMetadata = await getPropMetadata(buildContext, componentMetadata, componentName, kebabCase(propName))
          const propOptions = createPropOptions(buildContext, propMetadata, defaultValue)
          return {
            name: propName,
            options: propOptions,
          }
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
          buildContext.imports.add(DEFAULT_FN)
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
          throw new Error(`Unexpected prop definition type used at ${componentName}.props.${propName}, please open an issue.`)
        }
      } else {
        const propMetadata = await getPropMetadata(buildContext, componentMetadata, componentName, kebabCase(propName))
        const propOptions = createPropOptions(buildContext, propMetadata, defaultValue)
        componentProps[propName] = propOptions
      }
    }
  } else {
    throw new Error(`Unexpected props definition type used at ${componentName}.props, please open an issue.`)
  }

  for (const imported of buildContext.imports) {
    module.imports.$add({
      from: magicastUtils,
      imported,
    })
  }

  return generateCode(module)
}
