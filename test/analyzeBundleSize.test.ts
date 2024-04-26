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

describe.skip('Analyze Bundle Size', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: false,
  })

  const lockFile = fileURLToPath(new URL('../pnpm-lock.yaml', import.meta.url))
  const lockHash = await createFileHash(lockFile)

  it('client bundle size', async () => {
    const ctx = useTestContext()
    const { buildDir } = ctx.nuxt!.options
    const clientBundle = await folderSize(join(buildDir, 'dist/client')) || 0
    expect(roundKb(clientBundle)).toMatchSnapshot(lockHash)
  })

  it('nitro bundle size', async () => {
    const ctx = useTestContext()
    const { buildDir } = ctx.nuxt!.options
    const nitroBundle = await folderSize(join(buildDir, 'output')) || 0
    // Bundle size in rounded kb
    expect(roundKb(nitroBundle)).toMatchSnapshot(lockHash)
  })
})

async function createFileHash(path: string): Promise<string> {
  const hash = createHash('sha1')
  const stream = createReadStream(path)
  stream.pipe(hash)
  await finished(stream)
  return hash.digest('hex')
}

function roundKb(byteSize: number) {
  return Math.round(byteSize / 1000)
}
