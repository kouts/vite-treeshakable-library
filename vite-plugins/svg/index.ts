import { compileTemplate } from '@vue/compiler-sfc'
import fs from 'fs'
import { optimize } from 'svgo'
import type { Plugin } from 'vite'

const compileSvg = async (source: string, id: string) => {
  let { code } = compileTemplate({ id, source, transformAssetUrls: false, filename: 'dummy-filename' })

  code = code.replace('export function render', 'function render')
  code += `\nexport default { render };`

  return code
}

const optimizeSvg = async (content: string, path: string) => {
  const { data } = await optimize(content, { path })

  return data
}

type PluginOptions = {
  defaultExport: string
}

export default function vueSvgPlugin(options?: PluginOptions): Plugin {
  const defaultExport = options?.defaultExport || 'url'
  const cache = new Map()
  const svgRegex = /\.svg(?:\?(inline|url))?$/

  return {
    name: 'vue-svg',
    async transform(source, id, isBuild) {
      const res = id.match(svgRegex)

      if (res) {
        const type = res[1]

        if ((defaultExport === 'url' && typeof type === 'undefined') || type === 'url') {
          return {
            code: source,
            map: { mappings: '' },
          }
        }

        if ((defaultExport === 'inline' && typeof type === 'undefined') || type === 'inline') {
          const idWithoutQuery = id.replace('.svg?inline', '.svg')
          let result = cache.get(idWithoutQuery)

          if (!result) {
            const code = fs.readFileSync(idWithoutQuery, 'utf-8')
            const svg = await optimizeSvg(code, idWithoutQuery)

            result = await compileSvg(svg, idWithoutQuery)

            if (isBuild) {
              cache.set(idWithoutQuery, result)
            }
          }

          return {
            code: result,
            map: { mappings: '' },
          }
        }
      }
    },
  }
}
