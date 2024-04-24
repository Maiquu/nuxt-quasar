import type { ViteConfig } from '@nuxt/schema'
import type { Options as SassOptions } from 'sass'

/**
 *
 * Note: Following only applies to quasar <=2.13
 *
 * Quasar is pinned to a specific version (1.32.12) of sass, which is causing deprecation warnings polluting the console log when running Nuxt. This function silences 'Using / for division outside of calc() is deprecated' warnings by routing those log messages to a dump.
 * See an example of this here: https://github.com/quasarframework/quasar/pull/15514#issue-1606006213
 * Reasoning for Quasar to not fix this: https://github.com/quasarframework/quasar/pull/14213#issuecomment-1219170007
 *
 * @param config
 */
export function enableQuietSassWarnings(config: ViteConfig) {
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
