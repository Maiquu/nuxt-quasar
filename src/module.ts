import { dirname, resolve } from 'node:path'
import { addComponent, addImports, addImportsSources, addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'
import type { ViteConfig } from '@nuxt/schema'
import type { QuasarAnimations, QuasarFonts, QuasarIconSets as QuasarIconSet, QuasarIconSet as QuasarIconSetObject, QuasarLanguageCodes, QuasarPlugins } from 'quasar'
import type { AssetURLOptions } from 'vue/compiler-sfc'
import { parseNodeModulePath } from 'mlly'
import { version } from '../package.json'
import { transformDirectivesPlugin } from './plugins/transform/directives'
import type { ModuleContext, QuasarFontIconSet, QuasarImportData, QuasarImports, QuasarSvgIconSet, QuasarUIConfiguration, ResolveFn } from './types'
import { transformScssPlugin } from './plugins/transform/scss'
import { kebabCase, readFileMemoized, readJSON, uniq } from './utils'
import { virtualQuasarEntryPlugin } from './plugins/virtual/entry'
import { virtualAnimationsPlugin } from './plugins/virtual/animations'
import { virtualBrandPlugin } from './plugins/virtual/brand'
import { setupCss } from './setupCss'
import { generateTemplateQuasarConfig } from './template/config'
import { generateTemplateShims } from './template/shims'

/* eslint-disable-next-line */ // This interface will be augmented after `nuxt prepare`
export interface QuasarComponentDefaults {}

export type { QuasarUIConfiguration }

export interface ModuleOptions {
  /**
   * Would you like to use Quasar's SCSS/Sass variables?
   *   - `true`
   *      --> yes, all my vue files will be able to use $primary etc
   *   - `false`
   *      --> no, don't make the variables available in vue files
   *   - `'src/my-variables.sass'`
   *      --> yes, and I'd also like to customize those variables
   *
   * **Requires `sass`**
   *
   * @default false
   */
  sassVariables?: string | boolean

  /**
   * Quasar Plugins
   *
   * @see [Documentation](https://quasar.dev/quasar-plugins/)
   */
  plugins?: (keyof QuasarPlugins & string)[]

  config?: QuasarUIConfiguration

  /**
   * Default Language pack used by Quasar
   *
   * @see [Documentation](https://quasar.dev/options/quasar-language-packs)
   */
  lang?: QuasarLanguageCodes

  /**
   * Icon Set used by Quasar Components.
   * @default 'material-icons'
   */
  iconSet?: QuasarIconSet | QuasarIconSetObject

  /**
   * If selected quasar `iconSet` is a font set, it will automatically be included in `extras.fontIcons`.
   * @default true
   */
  autoIncludeIconSet?: boolean

  /**
   * App Config Key
   *
   * @default 'nuxtQuasar'
   */
  appConfigKey?: string

  /**
   * When enabled, it provides breakpoint aware versions for all flex (and display) related CSS classes.
   *
   * @see [Documentation](https://quasar.dev/layout/grid/introduction-to-flexbox#flex-addons)
   */
  cssAddon?: boolean

  /**
   * `@quasar/extras` options.
   *
   * @see [Documentation](https://github.com/quasarframework/quasar/blob/dev/extras/README.md)
   */
  extras?: {
    font?: QuasarFonts | null
    /** Icons that are imported as webfont. */
    fontIcons?: QuasarFontIconSet[]
    /** Automaticly import selected svg icon sets provided by `@quasar/extras`. */
    svgIcons?: QuasarSvgIconSet[]
    /**
     * Animations provided by quasar.
     *
     * @see [Documentation](https://quasar.dev/options/animations)
     */
    animations?: QuasarAnimations[] | 'all'
  }

  /**
   * Component Settings
   */
  components?: {
    /**
     * Set defaults for quasar components
     */
    defaults?: QuasarComponentDefaults
    /**
     * Auto-import quasar components
     * @default true
     */
    autoImport?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'quasar',
    version,
    configKey: 'quasar',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    lang: 'en-US',
    iconSet: 'material-icons',
    autoIncludeIconSet: true,
    cssAddon: false,
    sassVariables: false,
    appConfigKey: 'nuxtQuasar',
    components: {
      defaults: {},
      autoImport: true,
    },
    plugins: [],
    extras: {},
  },
  async setup(options, nuxt) {
    const { resolve: resolveLocal } = createResolver(import.meta.url)
    const { resolve: resolveQuasar } = createResolver(dirname(await resolvePath('quasar/package.json')))
    const { resolve: resolveQuasarExtras } = createResolver(dirname(await resolvePath('@quasar/extras/package.json')))

    const { version: quasarVersion } = await readJSON(resolveQuasar('package.json'))
    const importMap = await readJSON(resolveQuasar('dist/transforms/import-map.json')) as Record<string, string>
    const transformAssetUrls = await readJSON(resolveQuasar('dist/transforms/loader-asset-urls.json')) as AssetURLOptions
    const imports = categorizeImports(importMap, resolveQuasar)
    const sassVersion = await getSassVersion()

    const baseContext: Omit<ModuleContext, 'mode'> = {
      ssr: nuxt.options.ssr,
      dev: nuxt.options.dev,
      imports,
      options,
      quasarVersion,
      sassVersion,
      resolveLocal,
      resolveQuasar,
      resolveQuasarExtras,
    }

    // Include `iconSet` if its missing from `extras.fontIcons`
    if (
      options.autoIncludeIconSet
      && typeof options.iconSet === 'string'
      && isFontIconSet(options.iconSet)
      && !options.extras?.fontIcons?.includes(options.iconSet)
    ) {
      options.extras ??= {}
      options.extras.fontIcons ??= []
      options.extras.fontIcons.push(options.iconSet)
    }

    setupCss(nuxt.options.css, options)

    addPlugin(resolveLocal('./runtime/plugin'))

    addTemplate({
      write: true,
      filename: 'quasar.config.mjs',
      getContents: () => generateTemplateQuasarConfig(baseContext),
    })

    addTypeTemplate({
      filename: 'quasar.shims.d.ts',
      getContents: () => generateTemplateShims(baseContext),
    })

    if (options.components?.autoImport !== false) {
      for (const component of imports.components) {
        addComponent({
          name: component.name,
          export: component.name,
          filePath: 'quasar',
          // TOFIX: Nuxt v3.13.2 tries to resolve full component paths with following PR: https://github.com/nuxt/nuxt/pull/28843
          // Since this module has a custom way of resolving quasar, this breaks things.
          // Adding this property prevents nuxt from resolving components, but since this is an internal property, it might break again in future.
          // @ts-expect-error untyped internal property
          _scanned: true,
        })
      }
    }

    if (nuxt.options.imports.autoImport !== false) {
      // Quasar 2.15.0 introduces `useId` and `useHydrate` functions which are also provided by nuxt.
      // These functions should not be auto-imported in favor of nuxt.
      const ignoredComposables = ['useId', 'useHydration']
      for (const composable of imports.composables.filter(c => !ignoredComposables.includes(c.name))) {
        addImports({
          name: composable.name,
          from: 'quasar',
        })
      }
      if (options.plugins) {
        for (const plugin of uniq(options.plugins)) {
          const pluginPath = imports.plugins.find(p => p.name === plugin)?.path
          if (pluginPath) {
            addImports({
              name: plugin,
              from: 'quasar',
            })
          }
        }
      }

      if (options.extras?.svgIcons) {
        for (const iconSet of uniq(options.extras.svgIcons)) {
          const icons = await getIconsFromIconset(iconSet, resolveQuasarExtras)
          addImportsSources({
            from: `@quasar/extras/${iconSet}`,
            imports: icons,
          })
        }
      }
    }

    nuxt.hook('prepare:types', ({ references }) => {
      references.unshift({ types: 'quasar' })
    })

    nuxt.hook('vite:extendConfig', (config: ViteConfig, { isClient, isServer }) => {
      const ssr = nuxt.options.ssr
      const context: ModuleContext = {
        ...baseContext,
        mode: isServer ? 'server' : 'client',
      }

      config.optimizeDeps ??= {}
      config.optimizeDeps.exclude ??= []
      config.optimizeDeps.exclude.push('quasar')

      config.vue ??= {}
      config.vue.template ??= {}
      if (config.vue.template.transformAssetUrls !== false) {
        config.vue.template.transformAssetUrls ??= {}
        config.vue.template.transformAssetUrls = {
          ...config.vue.template.transformAssetUrls as object,
          ...transformAssetUrls,
        }
      }

      config.define = {
        ...config.define,
        __QUASAR_VERSION__: `'${quasarVersion}'`,
        __QUASAR_SSR__: ssr,
        __QUASAR_SSR_SERVER__: ssr && isServer,
        __QUASAR_SSR_CLIENT__: ssr && isClient,
        __QUASAR_SSR_PWA__: false,
      }

      config.plugins ??= []
      config.plugins.push(
        virtualAnimationsPlugin(context),
        virtualBrandPlugin(context),
        transformDirectivesPlugin(context),
        virtualQuasarEntryPlugin(context),
      )

      if (options.sassVariables) {
        config.plugins.push(transformScssPlugin(context))
      }
    })

    nuxt.hook('nitro:config', async (config) => {
      config.replace = {
        ...config.replace,
        __QUASAR_VERSION__: `'${quasarVersion}'`,
        __QUASAR_SSR__: nuxt.options.ssr,
        __QUASAR_SSR_SERVER__: true,
        __QUASAR_SSR_CLIENT__: false,
        __QUASAR_SSR_PWA__: false,
      }
      config.externals ??= {}
      config.externals.inline ??= []
      config.externals.inline.push('quasar')
    })

    nuxt.hook('devtools:customTabs', (tabs) => {
      tabs.push({
        name: 'quasar',
        title: 'Quasar',
        icon: 'vscode-icons-file-type-light-quasar',
        view: {
          type: 'iframe',
          src: 'https://quasar.dev/vue-components',
        },
      })
    })
  },
})

function isFontIconSet(iconSet: QuasarIconSet): iconSet is QuasarFontIconSet {
  return !iconSet.startsWith('svg-')
}

function categorizeImports(importMap: Record<string, string>, quasarResolve: ResolveFn): QuasarImports {
  const imports: QuasarImports = {
    raw: importMap,
    components: [],
    composables: [],
    directives: [],
    plugins: [],
  }

  for (const [name, path] of Object.entries(importMap)) {
    const importData: QuasarImportData = {
      name,
      path: quasarResolve(path),
    }
    if (path.includes('/components/') && !path.includes('/__tests__/')) {
      imports.components.push(importData)
    }
    else if (path.includes('/composables/')) {
      imports.composables.push(importData)
    }
    else if (path.includes('/directives/')) {
      imports.directives.push({
        ...importData,
        kebabCase: kebabCase(name),
      })
    }
    else if (path.includes('/plugins/')) {
      imports.plugins.push(importData)
    }
  }

  return imports
}

const iconDeclarationPattern = /^export declare const ([a-zA-Z\d]+): string;?$/gm

async function getIconsFromIconset(iconSet: QuasarSvgIconSet, resolveQuasarExtras: ResolveFn): Promise<string[]> {
  try {
    const icons = await readJSON(resolveQuasarExtras(`${iconSet}/icons.json`)) as string[]
    return icons
  }
  catch {
    // Some icon sets does not provide `icons.json`, so we check `index.d.ts`
    const path = resolveQuasarExtras(`${iconSet}/index.d.ts`)
    const dts = await readFileMemoized(path)
    const icons = [...dts.matchAll(iconDeclarationPattern)].map(arr => arr[1]!)

    return icons
  }
}

async function getSassVersion(): Promise<string | null> {
  try {
    const sassEntry = await resolvePath('sass')
    const modulePath = parseNodeModulePath(sassEntry)
    if (modulePath.dir) {
      const { version } = await readJSON(resolve(modulePath.dir, modulePath.name, './package.json'))
      return version
    }
  }
  catch {
    // noop
  }
  return null
}
