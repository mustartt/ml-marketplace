// suppress inspect Unresolved type for while file
// noinspection JSUnresolvedFunction

const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new webpack.DefinePlugin({
      process: { /* temp fix not sure why process NODE_DEBUG is not working */
        env: {
          NODE_DEBUG: false,
        },
      },
    }),
  ],
});
