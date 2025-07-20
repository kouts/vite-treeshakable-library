import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { glob } from 'glob'
import { join, resolve } from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'
import vueSvgPlugin from './vite-plugins/svg'
import vuePlugin from './vite-plugins/vue'

// Turns every file inside the lib folder into an entry point for tree-shaking.
// This is the recommended way, instead of using `output.preserveModules` - https://rollupjs.org/configuration-options/#input
// We have to be careful with the files we include here, as we don't want to include test files, storybook stories and files that contain only types.
const createEntries = () => {
  const entries = new Map<string, string>()
  const excludeFiles = ['.types.ts', '.spec.ts', '.stories.ts']

  for (const file of glob.sync('lib/**/*.{ts,vue}')) {
    const fileName = file.split('/').at(-1)?.split('.')[0]

    if (excludeFiles.some((excludeFile) => file.endsWith(excludeFile))) {
      continue
    }

    if (!fileName) {
      continue
    }

    entries.set(`${fileName}`, fileURLToPath(new URL(file, import.meta.url)))
  }

  entries.set('index', fileURLToPath(new URL('lib/index.ts', import.meta.url)))

  const res = Object.fromEntries(entries)

  return res
}

export default defineConfig({
  plugins: [vuePlugin(), vueSvgPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/playground'),
      '@root': resolve(__dirname, ''),
      '@assets': resolve(__dirname, '/playground/assets'),
      '@lib': resolve(__dirname, '/lib'),
      '@tests': resolve(__dirname, '/tests'),
    },
  },
  build: {
    minify: false,
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      entry: createEntries(),
      name: 'lib',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External modules that we don't want bundled into the library (automatically extracted from package.json peerDependencies)
      external: [...Object.keys(pkg.peerDependencies), 'tailwindcss', 'tailwindcss/resolveConfig'],
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[format]/[name].js',
        // Fix for https://github.com/vitejs/vite/issues/9214
        chunkFileNames: (assetInfo) => {
          const suffixToRemove = '.vue_vue_type_script_setup_true_lang'

          if (assetInfo.name?.endsWith(suffixToRemove)) {
            return `[format]/chunks/${assetInfo.name.slice(0, -suffixToRemove.length)}.js`
          } else {
            return '[format]/chunks/[name].js'
          }
        },
      },
    },
  },
  test: {
    globals: true,
    // Clear the mocks call count before each test so that we don't have to call vi.clearAllMocks manually - https://vitest.dev/config/#clearmocks
    clearMocks: true,
    globalSetup: './tests/vitest.global-setup.ts',
    setupFiles: ['./tests/vitest.globals.ts', './tests/vitest.extends.ts'],
    environment: 'jsdom',
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json-summary'],
      include: ['lib/**'],
      // Exclude test files, storybook stories, and TypeScript declaration files from the coverage report
      exclude: ['**/*.spec.{js,ts}', '**/*.stories.{js,ts}', '**/*.d.ts'],
    },
    // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: join(__dirname, '.storybook'),
            // Use the environment variable for better debugging in CI
            storybookUrl: process.env.SB_URL,
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
