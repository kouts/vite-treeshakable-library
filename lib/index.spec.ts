describe('index.ts module exports', () => {
  it('should export from @lib/index', async () => {
    const exports = await import('@lib/index')

    expect(exports).toBeDefined()
  })
})
