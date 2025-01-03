/*
This plugin adds additional config to the Vue Vite plugin so that it strips data-testid attributes from the production build.
Reference: https://github.com/vitejs/vite/issues/636#issuecomment-665545551
*/
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production'

const attrsToStrip = ['test-id', 'data-testid', 'data-testclass']

// Typing the "node" param properly would require us to install and import the @vue/compiler-core package

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripAttrs = (node: any) => {
  // If the node is an element node
  if (node.type === 1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node.props = node.props.filter((prop: any) => {
      // If the prop is an attr
      if (prop.type === 6) {
        return !attrsToStrip.includes(prop.name)
      }

      return true
    })
  }
}

export default function vuePlugin() {
  return vue({
    template: {
      compilerOptions: {
        nodeTransforms: isProd ? [stripAttrs] : [],
      },
    },
  })
}
