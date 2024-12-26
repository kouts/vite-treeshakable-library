import prettierConfig from '@kouts/eslint-config/prettier'

prettierConfig.plugins = Array.isArray(prettierConfig.plugins) ? prettierConfig.plugins : []
prettierConfig.plugins.push('prettier-plugin-tailwindcss')

export default prettierConfig
