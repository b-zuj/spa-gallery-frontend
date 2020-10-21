const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gallery',
      template: path.resolve(__dirname, '../src/template.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.ACCESS_KEY': JSON.stringify('TduXFqg5AQzljFLF3zp-MiNvAzj4Bp9eaY_lQUUC0xY'),
    }),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
