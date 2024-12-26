describe('v-alert.types module exports', () => {
  it('should export from @lib/components/v-alert/v-alert.types', async () => {
    const exports = await import('@lib/components/v-alert/v-alert.types')

    expect(exports).toBeDefined()
  })
})
