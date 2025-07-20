import VAlert from '@lib/components/v-alert/v-alert.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof VAlert> = {
  title: 'Components/VAlert',
  component: VAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'success'],
    },
    closable: {
      control: { type: 'boolean' },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The alert component can be used to provide information to users such as success or error messages, but also highlighted information complementing the normal flow of paragraphs and headers on a page.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof VAlert>

export const Info: Story = {
  render: (args) => ({
    components: { VAlert },
    setup() {
      return { args }
    },
    template: `<VAlert v-bind="args">${args.default}</VAlert>`,
  }),
  args: {
    type: 'info',
    default: 'Lorem ipsum dolor sit amet',
  },
}

Info.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const alertDiv = await canvas.getByRole('alert')

  await expect(alertDiv.innerText).toBe('Lorem ipsum dolor sit amet')
  await expect(alertDiv).toHaveClass('p-4 rounded-lg')
  await expect(alertDiv).toHaveStyle('background-color: #eff6ff')
}

export const Success = {
  args: {
    ...Info.args,
    type: 'success',
  },
}

export const Warning = {
  args: {
    ...Info.args,
    type: 'warning',
  },
}

export const Error = {
  args: {
    ...Info.args,
    type: 'error',
  },
}

export const Closable: Story = {
  render: (args) => ({
    components: { VAlert },
    setup() {
      return { args }
    },
    template: `<VAlert v-bind="args">${args.default}</VAlert>`,
  }),
  args: {
    ...Info,
    closable: true,
    default: 'This alert can be closed by clicking the X button',
  },
}

Closable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const alertDiv = await canvas.getByRole('alert')
  const firstDiv = alertDiv.querySelector('div')
  const closeButton = await canvas.getByRole('button', { name: /close/i })

  await expect(alertDiv).toBeVisible()
  await expect(firstDiv?.innerText).toBe('This alert can be closed by clicking the X button')
  await expect(closeButton).toBeVisible()
  await expect(closeButton).toHaveAttribute('aria-label', 'Close')

  await closeButton.click()

  await expect(alertDiv).not.toBeVisible()
}
