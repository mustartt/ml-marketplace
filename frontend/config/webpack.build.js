// suppress inspect Unresolved type for while file
// noinspection JSUnresolvedFunction

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            USE_LOCAL_OIDC: JSON.stringify(true),
        })
    ],
});
