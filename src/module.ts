import { dirname } from 'node:path'
import { addComponent, addImports, addImportsSources, addPlugin, addTemplate, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'
import type { ViteConfig } from '@nuxt/schema'
import type { QuasarAnimations, QuasarFonts, QuasarIconSets as QuasarIconSet, QuasarIconSet as QuasarIconSetObject, QuasarLanguageCodes, QuasarPlugins } from 'quasar'
import type { AssetURLOptions } from 'vue/compiler-sfc'
import satisfies from 'semver/functions/satisfies'
import { version } from '../package.json'
import { transformDirectivesPlugin } from './plugins/transform/directives'
import type { ImportData, ModuleContext, QuasarComponentDefaults, QuasarFontIconSet, QuasarFrameworkInnerConfiguration, QuasarImports, QuasarSvgIconSet, ResolveFn } from './types'
import { transformScssPlugin } from './plugins/transform/scss'
import { hasKeys, kebabCase, readFileMemoized, readJSON, uniq } from './utils'
import { virtualQuasarEntryPlugin } from './plugins/virtual/entry'
import { virtualAnimationsPlugin } from './plugins/virtual/animations'
import { virtualBrandPlugin } from './plugins/virtual/brand'
import { transformDefaultsPlugin } from './plugins/transform/defaults'
import { setupCss } from './setupCss'
import { enableQuietSassWarnings } from './quietSassWarnings'
import { generateTemplateQuasarConfig } from './template'

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
   *
   * Quasar is pinned to a specific version (1.32.12) of sass, which is causing deprecation warnings polluting the console log when running Nuxt. This function silences 'Using / for division outside of calc() is deprecated' warnings by routing those log messages to a dump.
   *
   * See an example of this here: https://github.com/quasarframework/quasar/pull/15514#issue-1606006213
   *
   * Reasoning for Quasar to not fix this: https://github.com/quasarframework/quasar/pull/14213#issuecomment-1219170007
   *
   * @default false // true if quasar version is <=2.13
   */
  quietSassWarnings?: boolean

  /** Quasar Plugins
   *
   * @see [Documentation](https://quasar.dev/quasar-plugins/)
   **/
  plugins?: (keyof QuasarPlugins)[]

  config?: Omit<QuasarFrameworkInnerConfiguration, 'lang'>

  /**
   * Default Language pack used by Quasar
   *
   * @see [Documentation](https://quasar.dev/options/quasar-language-packs)
   **/
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
   * When enabled, it provides breakpoint aware versions for all flex (and display) related CSS classes.
   *
   * **Requires `sass`**
   *
   * @see [Documentation](https://quasar.dev/layout/grid/introduction-to-flexbox#flex-addons)
   */
  cssAddon?: boolean

  /** `@quasar/extras` options.
   *
   * @see [Documentation](https://github.com/quasarframework/quasar/blob/dev/extras/README.md)
   */
  extras?: {
    font?: QuasarFonts | null
    /** Icons that are imported as webfont. */
    fontIcons?: QuasarFontIconSet[]
    /** Automaticly import selected svg icon sets provided by `@quasar/extras`. */
    svgIcons?: QuasarSvgIconSet[]
    /** Animations provided by quasar.
     *
     * @see [Documentation](https://quasar.dev/options/animations)
     **/
    animations?: QuasarAnimations[] | 'all'
  }

  /**
   * Component Settings
   */
  components?: {
    /**
     * EXPERIMENTAL
     *
     * Set defaults for quasar components
     **/
    defaults?: QuasarComponentDefaults
    /**
     * When `true`, defaults will be applied to components that aren't used directly.
     * For example, if defaults for `QBtn` are set, it will affect all components that use `QBtn`. (For example: `QBtnDropdown`, `QEditor`)
     *
     * Currently not very stable in development environment since vite will set `Cache-Control` headers for files located in `node_modules`
     * and changes made may not take effect without resetting the cache.
     *
     * @default false
     *
     **/
    deepDefaults?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'quasar',
    version,
    configKey: 'quasar',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  defaults: {
    lang: 'en-US',
    iconSet: 'material-icons',
    autoIncludeIconSet: true,
    cssAddon: false,
    sassVariables: false,
    quietSassWarnings: true,
    components: {
      defaults: {},
      deepDefaults: false,
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
    const baseContext: Omit<ModuleContext, 'mode'> = {
      imports,
      options,
      resolveLocal,
      resolveQuasar,
      resolveQuasarExtras,
    }

    // sass version is no longer pinned since v2.14
    options.quietSassWarnings ??= satisfies(quasarVersion, '<=2.13')

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

    if (nuxt.options.components !== false) {
      for (const component of imports.components) {
        addComponent({
          name: component.name,
          export: 'default',
          filePath: component.path,
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
          from: resolveLocal('./runtime/adapter'),
        })
      }
      if (options.plugins) {
        for (const plugin of uniq(options.plugins)) {
          addImports({
            name: plugin,
            from: resolveLocal('./runtime/adapter'),
          })
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

      if (options.quietSassWarnings) {
        enableQuietSassWarnings(config)
      }

      config.plugins ??= []
      config.plugins.push(
        virtualAnimationsPlugin(context),
        virtualBrandPlugin(context),
        transformDirectivesPlugin(context),
        virtualQuasarEntryPlugin(context),
      )
      if (hasKeys(options.components?.defaults)) {
        config.plugins.unshift(
          transformDefaultsPlugin(context),
        )
      }

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
      config.externals.inline.push(
        resolveQuasar('lang/en-US'),
        resolveQuasar('icon-set/material-icons'),
      )
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
    const importData: ImportData = {
      name,
      path: quasarResolve(path),
    }
    if (path.includes('/components/') && !path.includes('/__tests__/')) {
      imports.components.push(importData)
    } else if (path.includes('/composables/')) {
      imports.composables.push(importData)
    } else if (path.includes('/directives/')) {
      imports.directives.push({
        ...importData,
        kebabCase: kebabCase(name),
      })
    } else if (path.includes('/plugins/')) {
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
  } catch {
    // Some icon sets does not provide `icons.json`, so we check `index.d.ts`
    const path = resolveQuasarExtras(`${iconSet}/index.d.ts`)
    const dts = await readFileMemoized(path)
    const icons = [...dts.matchAll(iconDeclarationPattern)].map(arr => arr[1])

    return icons
  }
}
