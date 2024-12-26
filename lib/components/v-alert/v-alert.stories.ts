import VAlert from '@lib/components/v-alert/v-alert.vue'
import { expect, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof VAlert> = {
  title: 'Components/VAlert',
  component: VAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'success'],
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
