const webpack = require('webpack')

module.exports =  {
  /* ... */
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}