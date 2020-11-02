'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  return {
    context: path.join(__dirname, 'src'),
    entry: {
      app: './example/app',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: production ? 'http://tech.skbkontur.ru/react-ui-tour/' : '',
      filename: production ? '[name].[hash].js' : '[name].js',
      library: ['[name]'],
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          loader: 'ts-loader'
        },
        {
          test: /\.(css|less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                localIdentName: '[sha512:hash:base32:4]-[name]-[local]',
                modules: 'global',
              },
            },
            'less-loader',
          ],
        },
        {test: /\.(png|woff|woff2|eot)$/, use: 'file-loader?name=[name].[md5:hash:hex:8].[ext]'},
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/ ]),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin(),
      new WebpackCleanupPlugin({
        exclude: ['.git/**/*', '.*']
      })
    ],
    devtool: production ? false : 'inline-source-map',
  };
};
