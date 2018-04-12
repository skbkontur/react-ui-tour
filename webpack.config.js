'use strict';

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, './src/example/app.tsx'),
  dist: path.resolve(__dirname, './dist'),
  htmlTemplate: path.resolve(__dirname, './index.html'),
  external: path.resolve(__dirname, './node_modules')
};

const devServer = ({ host, port } = {}) => ({
  host,
  port,
  open: true,
  historyApiFallback: true
});

const loadTS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include,
        exclude,
        options: {
          useCache: true,
          forceIsolatedModules: true
        }
      }
    ]
  }
});

const extractCSS = (loaderOptions = {}, filename = '[name].css') => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: filename
  });
  loaderOptions.use = loaderOptions.use || 'css-loader';

  return {
    module: {
      rules: [
        Object.assign({ test: /\.css$/ }, loaderOptions, {
          use: plugin.extract({
            use: loaderOptions.use,
            fallback: 'style-loader'
          })
        })
      ]
    },
    plugins: [plugin]
  };
};

const cssModulePrefix = 'mcss';

const extractLESS = (options = {}) =>
  extractCSS(
    Object.assign(
      {
        test: /\.less$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: `${cssModulePrefix}-[path][name]-[local]`
            }
          },
          'less-loader'
        ]
      },
      options
    )
  );

const emitSourceMaps = () => ({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      }
    ]
  }
});

module.exports = merge(
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
  loadTS(),
  extractCSS({ include: [path.resolve(PATHS.external, '.')] }, 'vendor.css'),
  extractLESS({ exclude: /[\\/]node_modules[\\/]/ }),
  emitSourceMaps(),
  {
    devtool: 'source-map',
    devServer: devServer(),
    mode: 'development'
  }
);
