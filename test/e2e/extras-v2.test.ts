import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { setup } from '@nuxt/test-utils/e2e'
import { biApp, fetchDocument, findStylesheetContaining, firstRenderedPathD, firstIconPathD } from './helpers'

describe('@quasar/extras >=2', async () => {
  await setup({ rootDir: fileURLToPath(new URL('../fixtures/extras-v2', import.meta.url)) })

  it('injects the font icon stylesheet', async () => {
    expect(await findStylesheetContaining('.eva-activity')).toBeDefined()
  })

  it('injects animation stylesheets', async () => {
    expect(await findStylesheetContaining('.fadeIn')).toBeDefined()
  })

  it('auto-imports svg icons', async () => {
    const document = await fetchDocument()
    expect(document.querySelectorAll('svg').length).toBeGreaterThan(0)

    expect(await firstRenderedPathD()).toBe(firstIconPathD(biApp))
  })
})
