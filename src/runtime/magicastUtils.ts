const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

export const __merge__ = <T extends object, K extends object>(a: T, b: K): T & K => ({ ...a, ...b })

export const __default__ = <T>(value: T) => () => clone(value)

export const __values__ = <T>(values: T[]) => (value: T) => values.includes(value)
