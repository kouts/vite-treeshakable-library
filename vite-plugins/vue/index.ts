/*
This plugin adds additional config to the Vue Vite plugin so that it strips data-testid attributes from the production build.
Reference: https://github.com/vitejs/vite/issues/636#issuecomment-665545551
*/
import vue from '@vitejs/plugin-vue'
import { type ElementNode, type Node } from '@vue/compiler-core'

const isProd = process.env.NODE_ENV === 'production'

const attrsToStrip = ['test-id', 'data-testid', 'data-testclass']

const stripAttrs = (node: Node) => {
  // If the node is an element node
  if (node.type === 1) {
    const elementNode = node as ElementNode

    elementNode.props = elementNode.props.filter((prop) => {
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
