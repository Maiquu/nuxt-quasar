// @vitest-environment node
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'
import { JSDOM } from 'jsdom'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/defaults', import.meta.url)),
  })

  it('renders button with defaults', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    const dom = new JSDOM(html)
    const { document } = dom.window
    const btn = document.querySelector('#btn_default')
    expect(btn).toBeTruthy()
    expect([...btn!.classList.values()]).toContain('bg-primary')
    expect(btn!.textContent).toBe('Default')
  })

  it('renders button that overrides the defaults', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    const dom = new JSDOM(html, {})
    const { document } = dom.window
    document.write(html)
    const btn = document.querySelector('#btn_warning')
    const classes = [...btn!.classList.values()]
    expect(btn).toBeTruthy()
    expect(classes).toContain('bg-warning')
    expect(classes).not.toContain('bg-primary')
    expect(btn!.textContent).toBe('Warning')
  })
})
