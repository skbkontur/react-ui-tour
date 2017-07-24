'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ManifestPlugin = require('manifest-revision-webpack-plugin');

let production = false;
for (let i = 2; i < process.argv.length; i++){
  if (/-p/.test(process.argv[i])){
    production = true;
    break;
  }
}

const plugins = [];
const externals = [];

let outputName = '[name]';
let devtool = null;

let publicPath = '/dist/';

if (production) {
  plugins.push(
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ManifestPlugin('manifest.json', {
      rootAssetPath: '../dist',
    })
  );
  publicPath = '/dist/'; // Путь, по которому резолвится статика
  outputName += '.[hash]';
  externals.push({
    'react': 'React',
    'react-dom': 'ReactDOM',
  });
} else {
  devtool = 'inline-source-map';
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: entry.concat(['./index']),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: publicPath,
    filename: `${outputName}.js`,
    library: ['kontur', 'service', '[name]'],
    libraryTarget: 'umd',
  },
  externals: externals,
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2', 'react'],
        },
        include: [
          path.join(__dirname, 'src'),
        ],
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[name]__[local]#[md5:hash:hex:4]'),
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(png|woff|woff2|eot)$/, loader: 'file-loader?name=[name].[md5:hash:hex:8].[ext]'},
    ],
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: plugins.concat([
    new ExtractTextPlugin(`${outputName}.css`),
  ]),
  devtool: devtool,
};
