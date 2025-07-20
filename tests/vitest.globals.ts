import { enableAutoUnmount } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

// Automatically destroy Vue wrappers after each test - https://test-utils.vuejs.org/api/#enableAutoUnmount
enableAutoUnmount(afterEach)

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | null

    readonly rootMargin: string

    readonly thresholds: readonly number[]

    constructor() {
      this.root = null
      this.rootMargin = ''
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
