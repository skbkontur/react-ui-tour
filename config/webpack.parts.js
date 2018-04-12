const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  host,
  port,
  open: true,
  historyApiFallback: true
});

exports.loadTS = ({ include, exclude } = {}) => ({
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
exports.extractCSS = extractCSS;

const cssModulePrefix = 'mcss';

exports.extractLESS = (options = {}) =>
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

exports.emitSourceMaps = () => ({
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
