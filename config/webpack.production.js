const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = function () {
  return webpackMerge(baseConfig(), {
    output: {
      path: resolve('dist/zip'),
    },
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
        sourceMap: false,
      }),
      new ZipPlugin({
        filename: 'game.zip',
      })
    ],
  });
};