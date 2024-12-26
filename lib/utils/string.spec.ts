import { isString, toString } from '@lib/utils/string'

describe('toString', () => {
  it.each(['', new Date(), NaN, Infinity, {}, [], true, false, null, undefined])(
    'returns an empty string if input is %s',
    (val) => {
      expect(toString(val)).toBe('')
    },
  )

  it('returns a string when the value is a string', () => {
    expect(toString('test')).toBe('test')
  })

  it('converts the value to a string when the value is a number', () => {
    expect(toString(2903498.22)).toBe('2903498.22')
  })
})

describe('isString', () => {
  it('should return true for a string', () => {
    expect(isString('hello')).toBe(true)
  })

  it.each([
    [123, false],
    [{}, false],
    [[], false],
    [null, false],
    [undefined, false],
    [true, false],
    [() => {}, false],
  ])('should return %s for %p', (input, expected) => {
    expect(isString(input)).toBe(expected)
  })
})
