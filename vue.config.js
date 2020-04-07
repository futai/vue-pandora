const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const devServerPort = 8112
const name = 'Pandora'
const publicPath = IS_PROD ? '/vue-pandora' : '/'

module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  outputDir: 'lib',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: false
  },
  css: {
    extract: false,
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[name]_[hash:base64:8]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  chainWebpack(config) {
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(!IS_PROD, config => config.devtool('cheap-eval-source-map'))

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
