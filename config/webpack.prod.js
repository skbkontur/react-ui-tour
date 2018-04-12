const merge = require('webpack-merge');
const path = require('path');

const parts = require('./webpack.parts');
const common = require('./webpack.common');

module.exports = merge(
  common.config,
  parts.loadTS({
    configFileName: path.resolve(__dirname, '../tsconfig.prod.json')
  }),
  { 
    output: {
      path: common.PATHS.dist,
      publicPath: 'http://tech.skbkontur.ru/react-ui-tour/',
      filename: '[name].[hash].js'
    },
    mode: 'production' 
  }
);
