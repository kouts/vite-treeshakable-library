import VAlert from '@lib/components/v-alert/v-alert.vue'
import { createWrapperFor } from '@tests/vitest.helpers'

describe('VAlert.vue', () => {
  it.each([
    ['info', ['text-blue-800', 'bg-blue-50']],
    ['warning', ['text-yellow-800', 'bg-yellow-50']],
    ['success', ['text-green-800', 'bg-green-50']],
    ['error', ['text-red-800', 'bg-red-50']],
  ])('renders an alert of type %s', async (type, classes) => {
    const wrapper = createWrapperFor(VAlert, { props: { type } })

    const alert = wrapper.find('div[role="alert"]')

    expect(classes.every((c) => alert.classes().includes(c))).toBe(true)
  })

  it('renders slots for content', async () => {
    const wrapper = createWrapperFor(VAlert, {
      slots: {
        default: `This is an alert`,
      },
    })

    const alert = wrapper.find('div[role="alert"]')

    expect(alert.text()).toContain(`This is an alert`)
  })

  it('hides the close button when closeable is false', async () => {
    const wrapper = createWrapperFor(VAlert, {
      props: {
        closable: false,
      },
    })

    const button = wrapper.find('button')

    expect(button.exists()).toBe(false)
  })

  it('hides when clicking on the close button', async () => {
    const wrapper = createWrapperFor(VAlert, {
      props: {
        closable: true,
      },
    })

    const button = wrapper.find('button')

    await button.trigger('click')

    expect(wrapper.find('div[role="alert"]').exists()).toBe(false)
  })
})
