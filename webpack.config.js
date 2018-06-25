const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
  app: path.resolve(__dirname, "./src/example/app.tsx"),
  dist: path.resolve(__dirname, "./dist"),
  htmlTemplate: path.resolve(__dirname, "./index.html"),
  external: path.resolve(__dirname, "./node_modules")
};
const cssModulePrefix = "mcss";

module.exports = (env, argv) => {
  const extractTextPlugin = new ExtractTextPlugin({
    allChunks: true,
    filename: "[name].css"
  });
  const plugins = [
    new HtmlWebpackPlugin({ template: PATHS.htmlTemplate }),
    new HardSourceWebpackPlugin(),
    new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
    extractTextPlugin
  ];

  const config = {
    context: __dirname,
    entry: { app: PATHS.app },
    output: {
      path: PATHS.dist,
      filename: "[name].js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
          options: {
            useCache: true,
            forceIsolatedModules: true
          }
        },
        {
          test: /\.less$/,
          use: extractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: `${cssModulePrefix}-[path][name]-[local]`,
                  exclude: /[\\/]node_modules[\\/]/
                }
              },
              "less-loader"
            ],
            fallback: "style-loader"
          })
        },
        {
          test: /\.css$/,
          use: extractTextPlugin.extract({
            use: {
              loader: "css-loader",
              options: {
                include: [path.resolve(PATHS.external, ".")]
              }
            }
          })
        },
        {
          test: /\.(png|woff|woff2|eot)$/,
          loader: "file-loader?name=[name].[md5:hash:hex:8].[ext]"
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    plugins: plugins
  };

  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.devServer = {
      open: true,
      historyApiFallback: true
    };
  }

  if (argv.mode === "production") {
    //...
  }

  return config;
};
