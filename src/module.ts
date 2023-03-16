
import { readFile } from 'fs/promises'
import type { ModuleCustomTab } from '@nuxt/devtools'
import { addComponent, addImports, defineNuxtModule, resolvePath, addImportsSources, addPluginTemplate } from '@nuxt/kit'
import type { ViteConfig } from '@nuxt/schema'
import type { QuasarAnimations, QuasarFonts } from 'quasar'
import type { AssetURLOptions } from 'vue/compiler-sfc'
import { vuePluginTemplate } from './plugin'
import { transformDirectivesPlugin } from './transform/directives'
import type { ModuleContext, QuasarFontIconSets, QuasarImports, QuasarPlugins, QuasarSvgIconSets } from './types'
import { transformScssPlugin } from './transform/scss'
import { transformImportPlugin } from './transform/import'
import { importJSON, kebabCase } from './utils'
import { resolveAnimation, resolveFont, resolveFontIcon } from './resolve'
import { version } from '../package.json'

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
   * **`sass@1.32.12` required**
   *
   * @default false
   */
  sassVariables?: string | boolean

  /** Quasar Plugins
   *
   * @see [Documentation](https://quasar.dev/quasar-plugins/)
   **/
  plugins?: Exclude<QuasarPlugins, ''
    // Disable plugins that does not work correctly? Or warn users instead?
    // | 'AddressbarColor'
    // | 'Meta'
    // | 'Meta'
  >[]

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
    animations?: QuasarAnimations[]
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
    plugins: [],
    extras: {}
  },
  async setup (options, nuxt) {

    if (options.extras?.font) {
      nuxt.options.css.push(resolveFont(options.extras.font))
    }
    if (options.extras?.animations) {
      nuxt.options.css.push(...options.extras.animations.map(resolveAnimation))
    }
    if (options.extras?.fontIcons) {
      nuxt.options.css.push(...options.extras.fontIcons.map(resolveFontIcon))
    }

    if (options.sassVariables) {
      nuxt.options.css.push('quasar/src/css/index.sass')
    } else {
      nuxt.options.css.push('quasar/dist/quasar.css')
    }

    const { version: quasarVersion } = await importJSON('quasar/package.json')
    const importMap = await importJSON('quasar/dist/transforms/import-map.json') as Record<string, string>
    const transformAssetUrls = await importJSON('quasar/dist/transforms/loader-asset-urls.json') as AssetURLOptions
    const imports = await categorizeImports(importMap)

    addPluginTemplate({
      mode: 'client',
      filename: 'quasar-plugin.mjs',
      getContents: () => vuePluginTemplate({
        imports,
        options,
        mode: 'client',
      })
    })
    if (nuxt.options.ssr) {
      addPluginTemplate({
        mode: 'server',
        filename: 'quasar-plugin.server.mjs',
        getContents: () => vuePluginTemplate({
          imports,
          options,
          mode: 'server',
        })
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
          name: 'default',
          as: composable.name,
          from: composable.path
        })
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

    nuxt.hook('vite:extendConfig', (config: ViteConfig, { isClient, isServer }) => {
      const ssr = nuxt.options.ssr
      const context: ModuleContext = {
        imports,
        options,
        mode: isServer ? 'server' : 'client'
      }

      config.optimizeDeps ??= {}
      config.optimizeDeps.exclude ??= []
      config.optimizeDeps.exclude.push('quasar');

      config.vue = {
        template: {
          transformAssetUrls
        }
      }

      config.define = {
        ...config.define,
        __QUASAR_VERSION__: `'${ quasarVersion }'`,
        __QUASAR_SSR__: ssr,
        __QUASAR_SSR_SERVER__: ssr && isServer,
        __QUASAR_SSR_CLIENT__: ssr && isClient,
        __QUASAR_SSR_PWA__: false
      }

      config.plugins ??= []
      config.plugins.push(
        transformImportPlugin.vite(context),
        transformDirectivesPlugin.vite(context),
      )
      if (options.sassVariables && isClient) {
        config.plugins.push(transformScssPlugin.vite(context))
      }
    })

    nuxt.hook('nitro:config', async (config) => {
      config.replace = {
        ...config.replace,
        __QUASAR_VERSION__: `'${ quasarVersion }'`,
        __QUASAR_SSR__: nuxt.options.ssr,
        __QUASAR_SSR_SERVER__: true,
        __QUASAR_SSR_CLIENT__: false,
        __QUASAR_SSR_PWA__: false
      }
      config.externals ??= {}
      config.externals.inline ??= []
      config.externals.inline.push(
        await resolvePath('quasar/lang/en-US'),
        await resolvePath('quasar/icon-set/material-icons')
      )
    })

    // WARN: Webpack support incomplete
    nuxt.hook('webpack:config', (configs) => {
      configs.forEach(config => {
        const isClient = config.name === 'client'
        const isServer = !isClient
        const context: ModuleContext = {
          imports,
          options,
          mode: isServer ? 'server' : 'client'
        }

        config.plugins ??= []
        config.plugins.push(
          // TODO: Prepack tries to bundle webpack
          // new DefinePlugin({
          //   __QUASAR_VERSION__: JSON.stringify(quasarVersion),
          //   __QUASAR_SSR__: ssr,
          //   __QUASAR_SSR_SERVER__: ssr && isServer,
          //   __QUASAR_SSR_CLIENT__: ssr && isClient,
          //   __QUASAR_SSR_PWA__: false
          // })
        )

        config.plugins.push(
          transformImportPlugin.webpack(context),
          transformDirectivesPlugin.webpack(context),
        )
        if (options.sassVariables && isClient) {
          config.plugins.push(transformScssPlugin.webpack(context))
        }
      })
    })

    // @ts-expect-error
    nuxt.hook('devtools:customTabs', (tabs: ModuleCustomTab[]) => {
      tabs.push({
        name: 'quasar',
        title: 'Quasar',
        icon: 'vscode-icons-file-type-light-quasar',
        view: {
          type: 'iframe',
          src: 'https://quasar.dev/vue-components',
        }
      })
    })

  }
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
    if (path.includes('/components/')) {
      imports.components.push({
        name,
        path: await resolvePath(`quasar/${path}`)
      })
    }
    else if (path.includes('/composables/')) {
      imports.composables.push({
        name,
        path: await resolvePath(`quasar/${path}`)
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
        path: await resolvePath(`quasar/${path}`)
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
