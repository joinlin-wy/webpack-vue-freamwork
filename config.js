const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const entry = {
  demo: ["./src/demo/app.js"],//一个入口对应一个HtmlWebpackPlugin
  editor: ["./src/editor/app.js"]
}
const config = {
  entry: entry,
  plugins: generateHtmlPlugins(),
  build: {
    index: path.resolve(__dirname, './dist/index.html'),
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    port: process.env.PORT || 8080,
    autoOpenBrowser: false,
    assetsPublicPath: '/'
  }
}

function generateHtmlPlugins() {
  let htmlWebpackPlugins = []
  Object.keys(entry).forEach(function (key) {
    let plugin = {
      filename: key + '/index.html', //生成的html存放路径
      template: './src/index.html', //html模板路径
      inject: true, //资源注入位置 true | 'head' | 'body' | false
      chunks: ['common', key],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }
    if (process.env.NODE_ENV === 'production') {
      plugin.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin(plugin)
    )
  })
  return htmlWebpackPlugins
}

module.exports = config