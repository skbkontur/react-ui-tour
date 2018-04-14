const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts');
const common = require('./webpack.common');

module.exports = merge(
  common.config,
  parts.loadTS({
    configFileName: path.resolve(__dirname, '../tsconfig.json')
  }),
  parts.emitSourceMaps(),
  {
    devtool: 'source-map',
    devServer: parts.devServer(),
    mode: 'development'
  }
);
