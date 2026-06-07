import { afterAll, beforeAll, vi } from 'vitest'

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null

    readonly rootMargin: string

    readonly scrollMargin: string

    readonly thresholds: readonly number[]

    constructor(_callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      this.root = options?.root instanceof Element ? options.root : null
      this.rootMargin = options?.rootMargin ?? ''
      this.scrollMargin = ''
      this.thresholds = []
    }

    disconnect() {
      //
    }

    observe() {
      //
    }

    takeRecords(): IntersectionObserverEntry[] {
      return []
    }

    unobserve() {
      //
    }
  }

  globalThis.ResizeObserver = class ResizeObserver {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
      //
    }

    disconnect() {
      return null
    }

    observe() {
      return null
    }

    unobserve() {
      return null
    }
  }

  // @ts-expect-error type
  globalThis.CSS = { supports: vi.fn(), escape: () => '' }
})

afterAll(() => {
  vi.unstubAllEnvs()

  // @ts-expect-error type
  delete globalThis.IntersectionObserver
  // @ts-expect-error type
  delete globalThis.ResizeObserver
  // @ts-expect-error type
  delete globalThis.CSS
})
