export function omit<T extends object, K extends keyof T & string>(object: T, keys: K[]): Omit<T, K>
export function omit(object: Record<string, any>, keys: string[]): Record<string, any> {
  return Object.keys(object).reduce((output, key) => {
    if (!keys.includes(key)) {
      output[key] = object[key]
    }
    return output
  }, {} as Record<string, any>)
}
