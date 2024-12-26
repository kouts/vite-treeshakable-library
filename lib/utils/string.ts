export const isString = (val: unknown): val is string => typeof val === 'string'

export const toString = (value: unknown): string => {
  if (typeof value === 'number' && (!isFinite(value) || isNaN(value))) {
    return ''
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    return ''
  }

  return String(value)
}
