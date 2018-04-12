const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const parts = require('./webpack.parts')

const PATHS = {
  app: path.resolve(__dirname, '../src/example/app.tsx'),
  dist: path.resolve(__dirname, '../dist'),
  htmlTemplate: path.resolve(__dirname, '../index.html'),
  external: path.resolve(__dirname, '../node_modules')
};

exports.PATHS = PATHS

exports.config = merge(
  {
    entry: { app: PATHS.app },
    output: {
      path: PATHS.dist,
      filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css']
    },
    plugins: [
      new HtmlWebpackPlugin({ template: PATHS.htmlTemplate }),
      new HardSourceWebpackPlugin(),
      new webpack.WatchIgnorePlugin([/less\.d\.ts$/])
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot)$/,
          loader: 'file-loader?name=[name].[md5:hash:hex:8].[ext]'
        }
      ]
    }
  },
  parts.loadTS(),
  parts.extractCSS({ include: [path.resolve(PATHS.external, '.')] }, 'vendor.css'),
  parts.extractLESS({ exclude: /[\\/]node_modules[\\/]/ })
);
