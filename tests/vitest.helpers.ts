import { mount, type shallowMount, type VueWrapper } from '@vue/test-utils'
import { type ComponentPublicInstance } from 'vue'

type MountParams = Parameters<typeof mount>
type Component = MountParams[0]
type Options = MountParams[1] & { plugins?: Record<string, unknown> }

/**
 * A helper method to create vue test utils wrappers - https://test-utils.vuejs.org/api/#wrapper-methods
 * @param {Component} component - The vue component to mount
 * @param {Options} options - A combination of mounting options and a plugins object, used to pass/override plugins to the mount function
 * @param {typeof mount} mountingMethod - The mounting method to use, defaults to mount
 * @returns {VueWrapper} - A VueWrapper object
 */
export function createWrapperFor(
  component: Component,
  options: Options,
  mountingMethod: typeof mount | typeof shallowMount = mount,
): VueWrapper {
  const mountFn = mountingMethod ?? mount
  const pluginsObj = options?.plugins ?? {}
  const globalPlugins = !options?.global?.plugins ? Object.values(pluginsObj) : options?.global?.plugins
  const global = Object.assign({}, options?.global, { plugins: globalPlugins })
  const mergedOptions = Object.assign({}, options, { global })

  return mountFn(component, mergedOptions)
}

/**
 * Helper function to await for nextTick
 * Usage: `await waitNT(wrapper.vm)`
 */
export const waitNT = (ctx: ComponentPublicInstance) => new Promise((resolve) => ctx.$nextTick(() => resolve))

/**
 * Helper function to await for requestAnimationFrame
 */
export const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve))

/**
 * Helper function to await for a given amount of time (in ms)
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
