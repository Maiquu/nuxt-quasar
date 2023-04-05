import { readFile } from 'node:fs/promises'
import { addComponent, addImports, addImportsSources, addPluginTemplate, defineNuxtModule, resolvePath } from '@nuxt/kit'
import type { ViteConfig } from '@nuxt/schema'
import type { QuasarAnimations, QuasarFonts } from 'quasar'
import type { AssetURLOptions } from 'vue/compiler-sfc'
import type { Options as SassOptions } from 'sass'
import { version } from '../package.json'
import { vuePluginTemplate } from './plugin'
import { transformDirectivesPlugin } from './transform/directives'
import type { ModuleContext, QuasarFontIconSets, QuasarFrameworkInnerConfiguration, QuasarImports, QuasarPlugins, QuasarSvgIconSets } from './types'
import { transformScssPlugin } from './transform/scss'
import { importJSON, kebabCase } from './utils'
import { virtualQuasarEntryPlugin } from './virtual/entry'
import { virtualAnimationsPlugin } from './virtual/animations'
import { resolveFont, resolveFontIcon } from './resolve'
import { quasarAnimationsPath, quasarCssPath, quasarFontsPath, quasarIconsPath } from './constants'

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
   * **`sass@^1.32.12` required**
   *
   * @default false
   */
  sassVariables?: string | boolean

  /**
   * Quasar is pinned to a specific version (1.32.12) of sass, which is causing deprecation warnings polluting the console log when running Nuxt. This function silences 'Using / for division outside of calc() is deprecated' warnings by routing those log messages to a dump.
   * See an example of this here: https://github.com/quasarframework/quasar/pull/15514#issue-1606006213
   * Reasoning for Quasar to not fix this: https://github.com/quasarframework/quasar/pull/14213#issuecomment-1219170007
   */
  quietSassWarnings?: boolean
  /** Quasar Plugins
   *
   * @see [Documentation](https://quasar.dev/quasar-plugins/)
   **/
  plugins?: QuasarPlugins[]

  config?: Omit<QuasarFrameworkInnerConfiguration, 'brand' | 'lang'>

  /**
   * Icon Set used by Quasar Components. Don't forget to add selected iconSet to `extras.fontIcons`
   * @default 'material-icons'
   */
  iconSet?: QuasarFontIconSets

  /** `@quasar/extras` options.
   *
   * @see [Documentation](https://github.com/quasarframework/quasar/blob/dev/extras/README.md)
   */
  extras?: {
    font?: QuasarFonts | null
    /** Icons that are imported as webfont. */
    fontIcons?: QuasarFontIconSets[]
    /** Automaticly import selected svg icon sets provided by `@quasar/extras`. */
    svgIcons?: QuasarSvgIconSets[]
    /** Animations provided by quasar.
     *
     * @see [Documentation](https://quasar.dev/options/animations)
     **/
    animations?: QuasarAnimations[] | 'all'
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
    sassVariables: false,
    quietSassWarnings: true,
    plugins: [],
    iconSet: 'material-icons',
    extras: {},
  },
  async setup(options, nuxt) {
    const { version: quasarVersion } = await importJSON('quasar/package.json')
    const importMap = await importJSON('quasar/dist/transforms/import-map.json') as Record<string, string>
    const transformAssetUrls = await importJSON('quasar/dist/transforms/loader-asset-urls.json') as AssetURLOptions
    const imports = await categorizeImports(importMap)

    setupCss(nuxt.options.css, options)

    addPluginTemplate({
      mode: 'client',
      filename: 'quasar-plugin.mjs',
      getContents: () => vuePluginTemplate({
        imports,
        options,
        mode: 'client',
      }, nuxt.options.ssr),
    })
    if (nuxt.options.ssr) {
      addPluginTemplate({
        mode: 'server',
        filename: 'quasar-plugin.server.mjs',
        getContents: () => vuePluginTemplate({
          imports,
          options,
          mode: 'server',
        }, nuxt.options.ssr),
      })
    }

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
      for (const composable of imports.composables) {
        addImports({
          name: composable.name,
          from: 'quasar',
        })
      }
      if (options.plugins) {
        for (const plugin of options.plugins) {
          addImports({
            name: plugin,
            from: 'quasar',
          })
        }
      }
      if (options.extras?.svgIcons) {
        for (const iconSet of options.extras.svgIcons) {
          const icons = await getIconsFromIconset(iconSet)
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
        imports,
        options,
        mode: isServer ? 'server' : 'client',
      }

      config.optimizeDeps ??= {}
      config.optimizeDeps.exclude ??= []
      config.optimizeDeps.exclude.push('quasar')

      config.vue = {
        template: {
          transformAssetUrls,
        },
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
        muteQuasarSassWarnings(config)
      }

      config.plugins ??= []
      config.plugins.push(
        virtualQuasarEntryPlugin.vite(),
        virtualAnimationsPlugin.vite(context),
        // transformImportPlugin.vite(context),
        transformDirectivesPlugin.vite(context),
      )
      if (options.sassVariables && isClient) {
        config.plugins.push(transformScssPlugin.vite(context))
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
        await resolvePath('quasar/lang/en-US'),
        await resolvePath('quasar/icon-set/material-icons'),
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

async function categorizeImports(importMap: Record<string, string>): Promise<QuasarImports> {
  const imports: QuasarImports = {
    raw: importMap,
    components: [],
    composables: [],
    directives: [],
    plugins: [],
  }

  for (const [name, path] of Object.entries(importMap)) {
    if (path.includes('/components/') && !path.includes('/__tests__/')) {
      imports.components.push({
        name,
        path: await resolvePath(`quasar/${path}`),
      })
    }
    else if (path.includes('/composables/')) {
      imports.composables.push({
        name,
        path: await resolvePath(`quasar/${path}`),
      })
    }
    else if (path.includes('/directives/')) {
      imports.directives.push({
        name,
        path: await resolvePath(`quasar/${path}`),
        kebabCase: kebabCase(name),
      })
    }
    else if (path.includes('/plugins/')) {
      imports.plugins.push({
        name,
        path: await resolvePath(`quasar/${path}`),
      })
    }
  }

  return imports
}

const iconDeclarationPattern = /^export declare const ([a-zA-Z\d]+): string;?$/gm

async function getIconsFromIconset(iconSet: QuasarSvgIconSets): Promise<string[]> {
  try {
    const icons = await importJSON(`@quasar/extras/${iconSet}/icons.json`) as string[]
    return icons
  }
  catch {
    // Some icon sets does not provide `icons.json`, so we check `index.d.ts`
    const path = await resolvePath(`@quasar/extras/${iconSet}/index.d.ts`)
    const dts = await readFile(path, 'utf-8')
    const icons = [...dts.matchAll(iconDeclarationPattern)].map(arr => arr[1])

    return icons
  }
}

/**
 * Inject the Quasar css into the nuxt.options.css array.
 * It takes into account the order of the css array when the user has specified it.
 * Example:
 *  css: [
 *   'quasar/fonts',
 *   'quasar/animations',
 *   'quasar/icons',
 *   '@/assets/style.css',
 *   'quasar/css',
 * ]
 * @param css
 * @param options
 */
export function setupCss(css: string[], options: ModuleOptions) {
  // Quasar CSS is inserted at the start to ensure custom stylesheets will be able to overwrite styles without the use of !important.
  const quasarCssActualPath = options.sassVariables
    ? 'quasar/src/css/index.sass'
    : 'quasar/dist/quasar.css'

  const index = css.indexOf(quasarCssPath)
  if (index !== -1) {
    css.splice(index, 1, quasarCssActualPath)
  }
  else {
    css.unshift(quasarCssActualPath)
  }

  if (!css.includes(quasarAnimationsPath)) {
    css.unshift(quasarAnimationsPath)
  }

  if (options.extras?.fontIcons) {
    const i = css.indexOf(quasarIconsPath)
    if (i !== -1) {
      css.splice(i, 1, ...options.extras.fontIcons.map(resolveFontIcon))
    }
    else {
      css.unshift(...options.extras.fontIcons.map(resolveFontIcon))
    }
  }

  if (options.extras?.font) {
    const i = css.indexOf(quasarFontsPath)
    if (i !== -1) {
      css.splice(i, 1, resolveFont(options.extras.font))
    }
    else {
      css.unshift(resolveFont(options.extras.font))
    }
  }

  return css
}

/**
 * Quasar is pinned to a specific version (1.32.12) of sass, which is causing deprecation warnings polluting the console log when running Nuxt. This function silences 'Using / for division outside of calc() is deprecated' warnings by routing those log messages to a dump.
 * See an example of this here: https://github.com/quasarframework/quasar/pull/15514#issue-1606006213
 * Reasoning for Quasar to not fix this: https://github.com/quasarframework/quasar/pull/14213#issuecomment-1219170007
 *
 * @param config
 */
export function muteQuasarSassWarnings(config: ViteConfig) {
  // Source of this fix: https://github.com/quasarframework/quasar/pull/12034#issuecomment-1021503176
  const silenceSomeSassDeprecationWarnings: SassOptions<'sync'> = {
    verbose: true,
    logger: {
      warn(logMessage, logOptions) {
        const { stderr } = process
        const span = logOptions.span ?? undefined
        const stack = (logOptions.stack === 'null' ? undefined : logOptions.stack) ?? undefined

        if (logOptions.deprecation) {
          if (logMessage.startsWith('Using / for division outside of calc() is deprecated')) {
            // silences above deprecation warning
            return
          }
          stderr.write('DEPRECATION ')
        }
        stderr.write(`WARNING: ${logMessage}\n`)

        if (span !== undefined) {
          // output the snippet that is causing this warning
          stderr.write(`\n"${span.text}"\n`)
        }

        if (stack !== undefined) {
          // indent each line of the stack
          stderr.write(`    ${stack.toString().trimEnd().replace(/\n/gm, '\n    ')}\n`)
        }

        stderr.write('\n')
      },
    },
  }

  config.css ??= {}
  config.css.preprocessorOptions ??= {}

  const types = ['scss', 'sass'] as const

  for (const type of types) {
    const userConfig = config.css.preprocessorOptions[type]
    config.css.preprocessorOptions[type] = {
      ...silenceSomeSassDeprecationWarnings,
      ...userConfig,
    }
  }
}
