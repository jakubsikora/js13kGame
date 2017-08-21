const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const path = require('path');

module.exports = function () {
  return webpackMerge(baseConfig(), {
    devtool: 'source-map',
  });
};