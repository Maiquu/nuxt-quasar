import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { finished } from 'node:stream/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { setup, useTestContext } from '@nuxt/test-utils'
import folderSizeCallback from 'fast-folder-size'

const folderSize = promisify(folderSizeCallback)

describe('Analyze Bundle Size', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: false,
  })

  it('bundle size snapshots', async () => {
    const ctx = useTestContext()
    const { buildDir } = ctx.nuxt!.options

    const lockFile = fileURLToPath(new URL('../pnpm-lock.yaml', import.meta.url))
    const lockHash = await createFileHash(lockFile)

    const clientBundle = await folderSize(join(buildDir, 'dist/client'))
    const nitroBundle = await folderSize(join(buildDir, 'output'))

    expect(clientBundle).toMatchSnapshot(`${lockHash}.client`)
    expect(nitroBundle).toMatchSnapshot(`${lockHash}.nitro`)
  })
})

async function createFileHash(path: string) {
  const hash = createHash('sha1')
  const stream = createReadStream(path)
  stream.pipe(hash)
  await finished(stream)
  return hash.digest('hex')
}
