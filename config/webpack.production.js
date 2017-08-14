const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = function () {
  return webpackMerge(baseConfig(), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: true,
      }),
      new ZipPlugin({
        filename: 'game.zip',
      })
    ],
  });
};