import path from 'node:path'
import os from 'node:os'
import pMemoize from 'p-memoize';
import { resolvePath } from '@nuxt/kit'
import { readFile } from 'node:fs/promises'

export const isWindows = os.platform() === 'win32'

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

export function capitalize(value: string): string {
  return value.replace(/(^|-)(\w)/g, (a, b, c) => c.toUpperCase())
}

export function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export const importJSON = pMemoize(async (path: string) => {
  const resolvedPath = await resolvePath(path)
  return JSON.parse(await readFile(resolvedPath, 'utf-8'))
})

const PASCAL_CASE = /[a-z][A-Z]|^[A-Z]/g

/** Convert `PascalCase` to `kebab-case` */
export function kebabCase(string: string): string {
	return string.replaceAll(PASCAL_CASE,
		match => match.length === 1
			? match[0].toLowerCase()
			: `${match[0]}-${match[1].toLowerCase()}`
	)
}
