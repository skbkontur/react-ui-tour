'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
var es3ifyPlugin = require('es3ify-webpack-plugin');

let production = false;
for (let i = 2; i < process.argv.length; i++){
  if (/-p/.test(process.argv[i])){
    production = true;
    break;
  }
}

//todo: turn off warnings
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './example/app',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: production ? 'http://tech.skbkontur.ru/react-ui-tour/' : '/dist/',
    filename: production ? '[name].[hash].js' : '[name].js',
    library: ['[name]'],
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?useCache=true',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]__[local]#[md5:hash:hex:4]'),
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('typings-for-css-modules-loader?localIdentName=[name]__[local]#[md5:hash:hex:4]&modules&less&namedExport'),
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(png|woff|woff2|eot)$/, loader: 'file-loader?name=[name].[md5:hash:hex:8].[ext]'},
    ],
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.WatchIgnorePlugin([ /less\.d\.ts$/ ]),
    new ExtractTextPlugin(production ? '[name].[hash].css' : '[name].css'),
    new HtmlWebpackPlugin(),
    new WebpackCleanupPlugin({
      exclude: ['.git/**/*', '.*']
    })
  ],
  devtool: production ? null : 'inline-source-map',
}
