const path = require('path')

module.exports = {
  entry: {
    game: './src/client/app.js',
    editor: './src/editor/client/app.js'
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
