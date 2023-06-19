import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup, useTestContext } from '@nuxt/test-utils'
import { Window } from 'happy-dom'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/defaults', import.meta.url)),
  })

  it('renders button with defaults', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    const ctx = useTestContext()
    const { document } = new Window({
      url: `${ctx.url}/`,
    })
    document.write(html)
    const btn = document.querySelector('#btn_default')
    expect(btn).toBeTruthy()
    expect([...btn.classList.values()]).toContain('bg-primary')
    expect(btn.textContent).toBe('Default')
  })

  it('renders button that overrides the defaults', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    const ctx = useTestContext()
    const { document } = new Window({
      url: `${ctx.url}/`,
    })
    document.write(html)
    const btn = document.querySelector('#btn_warning')
    const classes = [...btn.classList.values()]
    expect(btn).toBeTruthy()
    expect(classes).toContain('bg-warning')
    expect(classes).not.toContain('bg-primary')
    expect(btn.textContent).toBe('Warning')
  })
})
