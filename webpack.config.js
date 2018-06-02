'use strict'

const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path')

module.exports = {
  entry: {
    game: './src/client/app.ts',
    editor: './src/editor/client/app.ts',
    navigation: './src/lib/navigation/active-links.ts'
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './public/js'),
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  resolve: {
     // Add '.ts' and '.tsx' as a resolvable extension.
     extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
      { test: /\.tsx?$/, loaders: ['awesome-typescript-loader'] },
      { test: /\.jsx?$/, loaders: ['babel-loader'] }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
}
