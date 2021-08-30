// suppress inspect Unresolved type for while file
// noinspection JSUnresolvedFunction

const paths = require('./paths');

const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new webpack.DefinePlugin({
      process: { /* temp fix not sure why process NODE_DEBUG is not working */
        env: {
          NODE_DEBUG: false,
        }
      }
    }),
  ],
});
