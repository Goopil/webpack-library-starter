/* global __dirname, require, module */

const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const {resolve} = require('path')
const env = require('yargs').argv.env
const pkg = require('./package.json')
const banner = `${pkg.name} ${pkg.version} - ${pkg.description}\nCopyright (c) ${ new Date().getFullYear() } ${pkg.author} - ${pkg.homepage}\nLicense: ${pkg.license}`
const libraryName = pkg.name
const plugins = [
  new webpack.BannerPlugin(banner)
]

let outputFile, sourceMap

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}))

  outputFile = libraryName + '.min.js'
  sourceMap = 'nosources-source-map'
} else {
  outputFile = libraryName + '.js'
  sourceMap = 'source-map'
}

module.exports = {
  entry: resolve('src/index.js'),
  devtool: sourceMap,
  output: {
    path: resolve('lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [
      resolve('./node_modules'),
      resolve('./bower_components'),
      resolve('./src')
    ],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}
