import { beforeEach, describe, expect, it } from 'vitest'
import { generateCode, parseExpression } from 'magicast'
import type { BuildContext, PropOptions } from '../src/plugins/transform/defaults'
import { createPropOptions } from '../src/plugins/transform/defaults'

describe('Prop Builder', () => {
  const generate = (mod: any) => generateCode(mod).code.trim()
  const context: BuildContext = {
    imports: new Set(),
    sourcePath: '',
    extended: {
      props: {},
    },
  }

  beforeEach(() => {
    context.imports.clear()
  })

  it('single type', () => {
    const propOptions = parseExpression<{ prop: PropOptions }>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: 'String',
    }, 'text'))

    expect(context.imports).toHaveLength(0)
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: String,
        default: "text"
      }"
    `)
  })

  it('type array', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: ['String', 'Number'],
    }, 100))
    expect(context.imports).toHaveLength(0)
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: [String, Number],
        default: 100
      }"
    `)
  })

  it('type array with invalid types', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: ['Object', 'String', 'null', 'undefined'],
    }, null))
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: [Object, String],
        default: __default__(null)
      }"
    `)
  })

  it('required', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: 'String',
      required: true,
    }, 'test'))
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: String,
        required: true,
        default: "test"
      }"
    `)
  })

  it('values validator', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: 'String',
      values: ['left', 'right'],
    }, 'left'))
    expect(context.imports).toHaveLength(1)
    expect(context.imports).toContain('__values__')
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: String,
        default: "left",
        validator: __values__(["left", "right"])
      }"
    `)
  })

  it('non-object defaults', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: 'String',
    }, 'item'))
    expect(context.imports).toHaveLength(0)
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: String,
        default: "item"
      }"
    `)
  })

  it('object defaults', () => {
    const propOptions = parseExpression<PropOptions>('{}')
    Object.assign(propOptions, createPropOptions(context, {
      type: 'Number',
    }, [2, 5, 10, 15, 30]))
    expect(context.imports).toHaveLength(1)
    expect(context.imports).toContain('__default__')
    expect(generate(propOptions)).toMatchInlineSnapshot(`
      "{
        type: Number,
        default: __default__([2, 5, 10, 15, 30])
      }"
    `)
  })
})

describe('Magicast Utils', async () => {
  const {
    __default__,
    __merge__,
    __values__,
  } = await import('../src/runtime/magicastUtils')

  it('default factory function', () => {
    const object = { key: 100 }
    const fn = __default__(object)

    expect(object).toMatchObject(fn())
    expect(object).not.equal(fn())
  })

  it('merge properties function', () => {
    const objectA = { x: 3, y: [1, 2, 3] }
    const objectB = { y: [1, 2], z: 4 }

    expect(__merge__(objectA, objectB)).toMatchObject({
      x: 3,
      y: [1, 2],
      z: 4,
    })
  })

  it('values validator function', () => {
    const validator = __values__([2, 5, 10, 20])

    expect(validator(5)).toBeTruthy()
    expect(validator(100)).toBeFalsy()
  })
})
