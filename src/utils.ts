import path from 'node:path'
import os from 'node:os'
import { readFile } from 'node:fs/promises'
import pMemoize from 'p-memoize'

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

export function omit<T extends object, K extends keyof T & string>(object: T, keys: K[]): Omit<T, K>
export function omit(object: Record<string, any>, keys: string[]): Record<string, any> {
  return Object.keys(object).reduce((output, key) => {
    if (!keys.includes(key)) {
      output[key] = object[key]
    }
    return output
  }, {} as Record<string, any>)
}

export const readFileMemoized = pMemoize(async (path: string) => {
  return readFile(path, 'utf-8')
})

export const readJSON = pMemoize(async (path: string) => {
  return JSON.parse(await readFile(path, 'utf-8'))
})

const PASCAL_CASE = /[a-z][A-Z]|^[A-Z]/g

/** Convert `PascalCase` to `kebab-case` */
export function kebabCase(string: string): string {
  return string.replaceAll(PASCAL_CASE,
    match => match.length === 1
      ? match[0].toLowerCase()
      : `${match[0]}-${match[1].toLowerCase()}`,
  )
}
