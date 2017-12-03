/* global __dirname, require, module */

const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const {resolve} = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')
const banner = `${pkg.name} ${pkg.version} - ${pkg.description}\nCopyright (c) ${ new Date().getFullYear() } ${pkg.author} - ${pkg.homepage}\nLicense: ${pkg.license}`
const libraryName = pkg.name

let outputFile, sourcemap
let plugins = [
  new webpack.BannerPlugin(banner)
]

if (env === 'dev') {
  sourcemap = 'source-map'
} else {
  sourcemap = 'nosources-source-map'
}

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}))
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

module.exports = {
  entry: resolve('src/index.js'),
  devtool: sourcemap,
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
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [
      resolve('./node_modules'),
      resolve('./src')
    ],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}
