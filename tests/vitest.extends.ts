// https://test-utils.vuejs.org/guide/extending-vtu/plugins.html#writing-a-plugin
import { config, createWrapperError, type VueWrapper } from '@vue/test-utils'

const Plugin = (wrapper: VueWrapper) => {
  function findByText(str: string, selector = '*') {
    const items = wrapper.findAll(selector)

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.text().trim() === str.trim()) {
        return item
      }
    }

    return createWrapperError('DOMWrapper')
  }

  return {
    findByText,
  }
}

config.plugins.VueWrapper.install(Plugin)

// https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot
config.global.renderStubDefaultSlot = true
