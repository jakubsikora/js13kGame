const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = function () {
  return webpackMerge(baseConfig(), {
    output: {
      path: resolve('dist/closure'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new ClosureCompilerPlugin({
        compiler: {
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          compilation_level: 'ADVANCED'
        },
        concurrency: 3,
      }),
      new ZipPlugin({
        filename: 'game.zip',
      })
    ],
  });
};