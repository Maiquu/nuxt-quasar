import type { ViteConfig } from '@nuxt/schema'
import type { LoggerWarnOptions } from 'sass'
import satisfies from 'semver/functions/satisfies.js'
import defu from 'defu'
import type { SassPreprocessorOptions } from 'vite'
import type { ModuleContext } from './types'

/**
 * Suppress sass deprecation warnings caused by quasar by modifying vite preprocessor options.
 *
 * If the installed sass version supports the `silenceDeprecations` option, it uses that. Otherwise, it falls back to a hacky workaround.
 * Said workaround only tries to suppress `slash-div` deprecation.
 *
 */
export function enableQuietSassWarnings(context: ModuleContext, config: ViteConfig) {
  // Use deprecation API if possible: https://github.com/sass/dart-sass/blob/main/CHANGELOG.md#1740
  const hasDeprecationAPI = context.sassVersion ? satisfies(context.sassVersion, '>=1.74') : false
  const hasSlashDivUsage = satisfies(context.quasarVersion, '<=2.13')

  config.css ??= {}
  config.css.preprocessorOptions ??= {}

  const types = ['scss', 'sass'] as const

  for (const type of types) {
    const userConfig = config.css.preprocessorOptions[type]
    const sassConfig: SassPreprocessorOptions = {}
    if (hasDeprecationAPI) {
      sassConfig.silenceDeprecations = [
        'import',
        'global-builtin',
        'legacy-js-api',
        ...(satisfies(context.quasarVersion, '<=2.13.0') ? ['slash-div'] as const : []),
      ]
    }
    else if (hasSlashDivUsage) {
      sassConfig.verbose = true
      sassConfig.logger = {
        warn: silenceSlashDivDeprecations,
      }
    }
    config.css.preprocessorOptions[type] = defu(userConfig, sassConfig) as SassPreprocessorOptions
  }
}

/**
 * Hacky way to silence deprecation warnings pre-deprecation API
 *
 * Source: https://github.com/quasarframework/quasar/pull/12034#issuecomment-1021503176
 */
function silenceSlashDivDeprecations(logMessage: string, logOptions: LoggerWarnOptions) {
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
    stderr.write(`    ${stack.toString().trimEnd().replace(/\n/g, '\n    ')}\n`)
  }

  stderr.write('\n')
}
