import { describe, expect, it } from 'vitest'
import type { UserConfig } from 'vite'
import type { ModuleContext } from '../src/types'
import { virtualQuasarEntryPlugin } from '../src/plugins/virtual/entry'

function applyConfig(mode: ModuleContext['mode'], config: UserConfig) {
  const plugin = virtualQuasarEntryPlugin({
    mode,
    dev: true,
    quasarVersion: '2.30.0',
    resolveQuasar: path => path,
  } as ModuleContext)
  const configHook = plugin.config as (config: UserConfig) => void
  configHook(config)
}

describe('virtual Quasar entry', () => {
  it('preserves client dependency optimization settings', () => {
    const config: UserConfig = { optimizeDeps: { include: ['example-package'] } }

    applyConfig('client', config)

    expect(config).toEqual({ optimizeDeps: { include: ['example-package'] } })
  })

  it('marks Quasar source as non-external for the server', () => {
    const config: UserConfig = { ssr: { noExternal: ['existing-package'] } }

    applyConfig('server', config)

    expect(config.ssr?.noExternal).toEqual(['existing-package', /\/node_modules\/quasar\/src\//])
  })
})
